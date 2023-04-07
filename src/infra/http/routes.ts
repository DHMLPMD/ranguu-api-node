import { Router } from 'express'
import { restaurantsRoutes } from 'modules/restaurants/infra/http/routes'

const apiRoutes = Router()

apiRoutes.use(
    '/restaurants',
    restaurantsRoutes
)

export { apiRoutes }