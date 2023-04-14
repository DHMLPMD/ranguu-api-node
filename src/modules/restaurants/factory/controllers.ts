import { PrismaRestaurantOnboardingStatusRepository } from "modules/restaurant_onboardings/infra/database/repository/prisma"
import { PrismaRestaurantsRepository } from "../infra/database/repository/prisma"
import { RestaurantOnboardingController } from "../infra/http/controllers/onboarding"
import { CreateBasicData } from "../services/_onboarding/CreateBasicData"
import { GetBasicData } from "../services/_onboarding/GetBasicData"
import { PrismaCityRepository } from "modules/cities/infra/database/repository/prisma"
import { PrismaRestaurantAddressRepository } from "modules/restaurant_address/infra/database/repository/prisma"
import { CreateAddressData } from "../services/_onboarding/CreateAddressData"
import { GetAddressData } from "../services/_onboarding/GetAddressData"
import { GetLastStep } from "../services/_onboarding/GetLastStep"

export const createRestaurantOnboardingController = () => {
    const restaurantRepo = new PrismaRestaurantsRepository()
    const restaurantOnboardingRepo = new PrismaRestaurantOnboardingStatusRepository()
    const cityRepo = new PrismaCityRepository()
    const restaurantAddressRepo = new PrismaRestaurantAddressRepository()

    const createBasicData = new CreateBasicData(
        restaurantRepo,
        restaurantOnboardingRepo
    )

    const getBasicData = new GetBasicData(
        restaurantRepo,
        restaurantOnboardingRepo
    )

    const createAddressData = new CreateAddressData(
        restaurantAddressRepo,
        restaurantOnboardingRepo,
        cityRepo,
    )

    const getAddressData = new GetAddressData(
        restaurantOnboardingRepo,
        restaurantAddressRepo,
    )

    const getLastStep = new GetLastStep(
        restaurantOnboardingRepo
    )

    const controller = new RestaurantOnboardingController(
        createBasicData,
        getBasicData,
        createAddressData,
        getAddressData,
        getLastStep
    )
    return controller
}