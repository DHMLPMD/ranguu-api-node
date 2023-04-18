import AppError from "core/classes/errorHandler";
import { IParamsValidateAccount } from "./interfaces";
import { IRestaurantRepository } from "modules/restaurants/infra/database/repository/interface";
import { IRestaurantOnboardingRepository } from "modules/restaurant_onboardings/infra/database/repository/interface";
import { eRestaurantOnboardingSteps } from "modules/restaurant_onboardings/utils";
import { redisClient } from "infra/database/redis";

export class ValidateAccount {
    constructor(
        private repo: IRestaurantRepository,
        private onboardingRepo: IRestaurantOnboardingRepository
    ) { }

    async execute(params: IParamsValidateAccount) {
        try {
            const steps = await this.onboardingRepo.findByRestaurantId(params.restaurant_id)

            if (steps.length == 0)
                throw new Error('Operação não permitida')

            const completedStep = steps.find(item => item.step_key === eRestaurantOnboardingSteps.COMPLETED)

            if (completedStep?.completed_at !== null)
                throw new Error('Operação não permitida')

            const recoveredCode = await redisClient?.get(`restaurant_onboarding_id${params.restaurant_id}`)

            if (recoveredCode) {
                if (recoveredCode == params.code) {

                    await this.repo.finalizeOnboarding(params.restaurant_id)

                    await redisClient?.del(`restaurant_onboarding_id${params.restaurant_id}`)

                    return
                } else
                    throw new Error('Código inválido')
            }
            else
                throw new Error('Código expirado')

        } catch (error) {
            throw new AppError(error.message)
        }
    }
}