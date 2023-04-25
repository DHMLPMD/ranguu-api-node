import { Router } from 'express'
import { authRoutes } from 'modules/auth/infra/http/routes'
import { cityRoutes } from 'modules/cities/infra/http/routes'
import { restaurantsRoutes } from 'modules/restaurants/infra/http/routes'
import { ensureAuth } from './middlewares/ensureAuth'
import { categoryRoutes } from 'modules/categories/infra/http/routes'

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

apiRoutes.use(
    '/categories',
    ensureAuth,
    categoryRoutes
)

export { apiRoutes }