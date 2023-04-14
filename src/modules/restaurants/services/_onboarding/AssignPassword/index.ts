import AppError from "core/classes/errorHandler";
import { IParamsAssignPassword } from "./interfaces";
import { hashPassword } from "core/utils/functions";
import { IRestaurantRepository } from "modules/restaurants/infra/database/repository/interface";
import { IRestaurantOnboardingRepository } from "modules/restaurant_onboardings/infra/database/repository/interface";
import { eRestaurantOnboardingSteps } from "modules/restaurant_onboardings/utils";
import { IMailService } from "services/mail/interfaces";
import { genRandomCode } from "core/utils/formatters/string";
import { redisClient } from "infra/database/redis";

export class AssignPassword {
    constructor(
        private repo: IRestaurantRepository,
        private onboardingRepo: IRestaurantOnboardingRepository,
        private mailService: IMailService
    ) { }

    async execute(params: IParamsAssignPassword) {
        try {
            const { restaurant_id, password } = params

            const steps = await this.onboardingRepo.findByRestaurantId(restaurant_id)

            if (steps.length == 0)
                throw new AppError('Operação não permitida')

            const basicDataStep = steps.find(item => item.step_key == eRestaurantOnboardingSteps.BASIC_DATA)
            const addressStep = steps.find(item => item.step_key == eRestaurantOnboardingSteps.ADDRESS_DATA)

            if(basicDataStep?.completed_at === null || addressStep?.completed_at === null)
                throw new Error('Operação não permitada, onboarding não concluído')

            const hashedPassword = await hashPassword(password)

            await this.repo.updateOne({
                where: {
                    id: restaurant_id
                },
                data: {
                    password_hash: hashedPassword,
                    updated_at: new Date(),
                }
            })

            const restaurant = await this.repo.findOneByArgs({
                id: restaurant_id
            })

            const randomCode = genRandomCode(6)

            await redisClient?.set(
                `restaurant_onboarding_id${restaurant_id}`,
                randomCode,
                {
                    EX: 90
                }
            )

            const result =  await this.mailService.sendTextMail(
                restaurant.email,
                'Confirmação de Conta',
                `Olá, este é um email de confirmação de conta.\nPor favor insira o código abaixo no campo de validação no seu fluxo.\n\nCódigo: ${randomCode}`
            )

            if(result !== 202)
                throw new Error('Ocorreu um erro ao enviar o email com o código de confirmação')
            
            return {
                sent_to: restaurant.email,
                code: {
                    code_ttl_seconds: 90,
                    length: randomCode.length
                }
            }
        } catch (error) {
            throw new AppError(error.message)
        }
    }
}