import { Prisma, RestaurantOnboardingStatus, Restaurants } from "@prisma/client";

export interface IRestaurantRepository {
    findOneByArgs(params: Prisma.RestaurantsWhereInput, selectFields?: Prisma.RestaurantsSelect, throwIfNotExists?: boolean): Promise<Restaurants>
    createOne(params: Prisma.RestaurantsCreateArgs): Promise<Restaurants>
    updateOne(params: Prisma.RestaurantsUpdateArgs): Promise<boolean>
    initiateOnboarding(restaurantCreateParams: Prisma.RestaurantsCreateArgs, onboardingSteps: Partial<RestaurantOnboardingStatus>[]): Promise<Restaurants>
}