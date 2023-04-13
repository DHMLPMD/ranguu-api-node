import { RestaurantOnboardingStatus } from "@prisma/client";
import AppError from "core/classes/errorHandler";
import { IRestaurantOnboardingRepository } from "modules/restaurant_onboardings/infra/database/repository/interface";
import { eRestaurantOnboardingSteps } from "modules/restaurant_onboardings/utils";
import { IRestaurantRepository } from "modules/restaurants/infra/database/repository/interface";

export class GetBasicData {
    constructor(
        private restaurantRepo: IRestaurantRepository,
        private onbaoardingRepo: IRestaurantOnboardingRepository,
    ) { }

    async execute(restaurantId: string) {
        try {
            const onboardingSteps = await this.onbaoardingRepo.findByRestaurantId(restaurantId)

            const finalStep = onboardingSteps.find(item => item.step_key === eRestaurantOnboardingSteps.COMPLETED) as RestaurantOnboardingStatus

            if (finalStep.completed_at !== null)
                throw new Error('Ação não permitada')

            const restaurant = await this.restaurantRepo.findOneByArgs({
                id: restaurantId,
            })

            return {
                restaurant: {
                    id: restaurant.id,
                    commom_name: restaurant.commom_name,
                    social_name: restaurant.social_name,
                    document_number: restaurant.document_number,
                    email: restaurant.email,
                    phone: restaurant.phone,
                    tax_regime: restaurant.tax_regime,
                    responsible_name: restaurant.responsible_name,
                    responsible_document: restaurant.responsible_document,
                    updated_at: restaurant.updated_at
                }
            }
        } catch (error) {
            throw new AppError(error.message)
        }
    }
}