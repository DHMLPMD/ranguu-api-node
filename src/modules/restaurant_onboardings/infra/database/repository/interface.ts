import { Prisma, RestaurantOnboardingStatus } from "@prisma/client";

export interface IRestaurantOnboardingRepository {
    createOne(params: Prisma.RestaurantOnboardingStatusCreateArgs): Promise<RestaurantOnboardingStatus>
    findByRestaurantId(restaurantId: string): Promise<RestaurantOnboardingStatus[]>
}