import { PrismaRestaurantsRepository } from "modules/restaurants/infra/database/repository/prisma"
import { AuthController } from "../infra/http/controller"
import { Authenticator } from "../services/Authenticator"
import { PrismaTokensRepository } from "modules/tokens/infra/database/repository/prisma"
import { AuthenticateRestaurants } from "../services/AuthenticateRestaurants"

export const createAuthController = () => {
    const restaurantRepo = new PrismaRestaurantsRepository()
    const tokenRepo = new PrismaTokensRepository()
    const authenticatorService = new Authenticator(tokenRepo)

    const authRestaurants = new AuthenticateRestaurants(
        restaurantRepo,
        authenticatorService
    )
    
    const controller = new AuthController(
        authRestaurants
    )
    return controller
}