import { Router } from 'express'
import { authRoutes } from 'modules/auth/infra/http/routes'
import { cityRoutes } from 'modules/cities/infra/http/routes'
import { restaurantsRoutes } from 'modules/restaurants/infra/http/routes'

const apiRoutes = Router()

apiRoutes.use(
    '/session',
    authRoutes
)

apiRoutes.use(
    '/restaurants',
    restaurantsRoutes
)

apiRoutes.use(
    '/cities',
    cityRoutes
)

export { apiRoutes }