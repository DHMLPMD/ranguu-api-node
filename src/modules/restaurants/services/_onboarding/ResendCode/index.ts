import AppError from "core/classes/errorHandler";
import { genRandomCode } from "core/utils/formatters/string";
import { redisClient } from "infra/database/redis";
import { IRestaurantOnboardingRepository } from "modules/restaurant_onboardings/infra/database/repository/interface";
import { eRestaurantOnboardingSteps } from "modules/restaurant_onboardings/utils";
import { IRestaurantRepository } from "modules/restaurants/infra/database/repository/interface";
import { IMailService } from "services/mail/interfaces";

export class ResendCode {
    constructor(
        private repo: IRestaurantRepository,
        private onboardingRepo: IRestaurantOnboardingRepository,
        private mailService: IMailService
    ) { }

    async execute(restaurantId: string) {
        try {
            const steps = await this.onboardingRepo.findByRestaurantId(restaurantId)
            if (steps.length == 0)
                throw new Error('Operação não permitida')

            const completedStep = steps.find(item => item.step_key === eRestaurantOnboardingSteps.COMPLETED)

            if (completedStep?.completed_at !== null)
                throw new Error('Operação não permitida')

            const { email } = await this.repo.findOneByArgs({
                id: restaurantId
            })

            const randomCode = genRandomCode(6)

            const startTime = new Date().getTime()
            await redisClient?.set(
                `restaurant_onboarding_id${restaurantId}`,
                randomCode,
                { EX: 95 }
            )

            const result = await this.mailService.sendTextMail(
                email,
                'Confirmação de Conta',
                `Olá, este é um email de confirmação de conta.\nPor favor insira o código abaixo no campo de validação no seu fluxo.\n\nCódigo: ${randomCode}`
            )

            if (result !== 202)
                throw new Error('Ocorreu um erro ao enviar o email com o código de confirmação')

            const endTime = new Date().getTime()
            const remainingTime = Math.round(95 - (endTime - startTime) / 1000)
            return {
                sent_to: email,
                code: {
                    code_ttl_seconds: remainingTime,
                    length: randomCode.length
                }
            }

        } catch (error) {
            throw new AppError(error.message)
        }
    }
}