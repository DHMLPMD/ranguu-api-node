import AppError from "core/classes/errorHandler";
import { IRestaurantAddressRepository } from "modules/restaurant_address/infra/database/repository/interfaces";
import { IRestaurantOnboardingRepository } from "modules/restaurant_onboardings/infra/database/repository/interface";
import { eRestaurantOnboardingSteps } from "modules/restaurant_onboardings/utils";

export class GetAddressData {
    constructor(
        private repo: IRestaurantOnboardingRepository,
        private addressRepo: IRestaurantAddressRepository,
    ) { }

    async execute(restaurantId: string) {
        try {
            const onboardingSteps = await this.repo.findByRestaurantId(restaurantId)

            const completeStep = onboardingSteps.find(item => item.step_key == eRestaurantOnboardingSteps.COMPLETED)

            if (completeStep?.completed_at !== null)
                throw new Error('Operação não permitida')

            const address = await this.addressRepo.findOneByArgs({
                restaurant_id: restaurantId
            })

            if(!address)
                throw new Error('Dados de endereço não localizados')

            return { address }
        } catch (error) {
            throw new AppError(error.message)
        }
    }
}