import { PrismaRestaurantOnboardingStatusRepository } from "modules/restaurant_onboardings/infra/database/repository/prisma"
import { PrismaRestaurantsRepository } from "../infra/database/repository/prisma"
import { RestaurantOnboardingController } from "../infra/http/controllers/onboarding"
import { CreateBasicData } from "../services/_onboarding/CreateBasicData"

export const createRestaurantOnboardingController = () => {
    const restaurantRepo = new PrismaRestaurantsRepository()
    const restaurantOnboardingRepo = new PrismaRestaurantOnboardingStatusRepository()

    const createBasicData = new CreateBasicData(
        restaurantRepo,
        restaurantOnboardingRepo
    )

    const controller = new RestaurantOnboardingController(
        createBasicData
    )
    return controller
}