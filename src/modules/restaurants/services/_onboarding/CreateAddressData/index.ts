import AppError from "core/classes/errorHandler";
import { RestaurantOnboardingStatus } from "@prisma/client";

import { IParamsCreateRestaurantOnboardingAddressData } from "./interfaces";
import { IRestaurantOnboardingRepository } from "modules/restaurant_onboardings/infra/database/repository/interface";
import { IRestaurantAddressRepository } from "modules/restaurant_address/infra/database/repository/interfaces";
import { eRestaurantOnboardingSteps } from "modules/restaurant_onboardings/utils";
import { ICityRepository } from "modules/cities/infra/database/repository/interfaces";

export class CreateAddressData {

    constructor(
        private repo: IRestaurantAddressRepository,
        private onboardingRepo: IRestaurantOnboardingRepository,
        private cityRepo: ICityRepository
    ) { }

    async execute(params: IParamsCreateRestaurantOnboardingAddressData) {
        try {
            let id: string

            const onboardingSteps = await this.onboardingRepo.findByRestaurantId(params.restaurant_id)

            if (onboardingSteps.length == 0)
                throw new Error('Operação não permitida')

            const completedStep = onboardingSteps.find(item => item.step_key == eRestaurantOnboardingSteps.COMPLETED) as RestaurantOnboardingStatus

            if (completedStep.completed_at !== null)
                throw new Error('Operação não permitida')

            const city = await this.cityRepo.findOneByArgs(
                {
                    id: params.city_id,
                    is_enabled: true,
                },
                undefined,
                false
            )

            if(!city)
                throw new Error('Dados da cidade não localizados')

            const existing = await this.repo.findOneByArgs(
                { restaurant_id: params.restaurant_id },
                undefined,
                false
            )

            if (!existing) {
                const { id: restaurantAddressId } = await this.repo.createAddressOnboarding({
                    data: {
                        ...params as any
                    }
                })

                id = restaurantAddressId
            } else {
                await this.repo.updateOne({
                    where: {
                        restaurant_id: params.restaurant_id,
                    },
                    data: {
                        address: params.address,
                        number: params.number,
                        complement: params.complement,
                        neighborhood: params.neighborhood,
                        city_id: params.city_id,
                        zip_code: params.zip_code
                    }
                })

                id = existing.id
            }

            return {
                address_id: id
            }
        } catch (error) {
            throw new AppError(error.message)
        }
    }
}