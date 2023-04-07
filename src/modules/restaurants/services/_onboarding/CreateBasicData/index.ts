import AppError from "core/classes/errorHandler";
import { IParamsCreateRestaurantBasicData } from "./interfaces";
import { IRestaurantRepository } from "modules/restaurants/infra/database/repository/interface";
import { IRestaurantOnboardingRepository } from "modules/restaurant_onboardings/infra/database/repository/interface";
import { RestaurantOnboardingStep, eRestaurantOnboardingSteps, validRestaurantOnboardingSteps } from "modules/restaurant_onboardings/utils";

export class CreateBasicData {
    constructor(
        private repo: IRestaurantRepository,
        private onboardingRepo: IRestaurantOnboardingRepository
    ) { }

    async execute(params: IParamsCreateRestaurantBasicData) {
        try {
            let id: string
            const existing = await this.repo.findOneByArgs(
                {
                    document_number: params.document_number,
                    is_email_verified: false,
                },
                undefined,
                false
            )

            if (!existing) {
                const { id: createdRestaurantId } = await this.repo.initiateOnboarding(
                    {
                        data: {
                            commom_name: params.commom_name,
                            social_name: params.social_name,
                            document_number: params.document_number,
                            email: params.email,
                            phone: params.phone,
                            responsible_name: params.responsible_name,
                            responsible_document: params.responsible_document,
                            tax_regime: params.tax_regime,
                        } as any
                    },
                    validRestaurantOnboardingSteps.map(item => {
                        const completed_at = (item as RestaurantOnboardingStep) == 'basic_data' ? new Date() : undefined

                        return {
                            completed_at,
                            step_key: item,
                            status: Boolean(completed_at),
                        }
                    })
                )

                id = createdRestaurantId
            } else {
                await this.repo.updateOne({
                    where: {
                        document_number: params.document_number,
                        is_email_verified: false,
                    } as any,
                    data: {
                        commom_name: params.commom_name,
                        social_name: params.social_name,
                        document_number: params.document_number,
                        email: params.email,
                        phone: params.phone,
                        responsible_name: params.responsible_name,
                        responsible_document: params.responsible_document,
                        tax_regime: params.tax_regime,

                    }
                })
                id = existing.id
            }

            return {
                restaurant_id: id
            }
        } catch (error) {
            throw new AppError(error.message)
        }
    }
}