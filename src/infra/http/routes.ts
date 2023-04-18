import { Router } from 'express'
import { cityRoutes } from 'modules/cities/infra/http/routes'
import { restaurantsRoutes } from 'modules/restaurants/infra/http/routes'

const apiRoutes = Router()

apiRoutes.use(
    '/restaurants',
    restaurantsRoutes
)

apiRoutes.use(
    '/cities',
    cityRoutes
)

export { apiRoutes }