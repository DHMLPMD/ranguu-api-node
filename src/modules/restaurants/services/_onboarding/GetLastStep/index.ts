import AppError from "core/classes/errorHandler";
import { IRestaurantOnboardingRepository } from "modules/restaurant_onboardings/infra/database/repository/interface";
import { eRestaurantOnboardingSteps } from "modules/restaurant_onboardings/utils";

export class GetLastStep {
    constructor(
        private repo: IRestaurantOnboardingRepository
    ) { }

    async execute(restaurantId: string) {
        try {
            const steps = await this.repo.findByRestaurantId(restaurantId)

            if (steps.length == 0)
                throw new Error('Operação não permitida')

            const basicDataStep = steps.find(item => item.step_key == eRestaurantOnboardingSteps.BASIC_DATA)
            const addressStep = steps.find(item => item.step_key == eRestaurantOnboardingSteps.ADDRESS_DATA)
            const completedStep = steps.find(item => item.step_key == eRestaurantOnboardingSteps.COMPLETED)

            if(completedStep?.completed_at !== null)
                return {
                    last_step: completedStep?.step_key
                }
            
            if(addressStep?.completed_at !== null)
                return {
                    last_step: addressStep?.step_key
                }

            if(basicDataStep?.completed_at !== null)
                return {
                    last_step: basicDataStep?.step_key
                }

        } catch (error) {
            throw new AppError(error.message)
        }
    }
}