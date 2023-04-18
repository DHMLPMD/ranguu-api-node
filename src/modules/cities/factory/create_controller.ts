import { PrismaCityRepository } from "../infra/database/repository/prisma"
import { CitiesController } from "../infra/http/controller"
import { GetCitiesEnabled } from "../services/GetCitiesEnabled"

export const createCitiesController = () => {
    const cityRepo = new PrismaCityRepository()

    const getCitiesEnabled = new GetCitiesEnabled(cityRepo)

    const controller = new CitiesController(
        getCitiesEnabled
    )
    return controller
}