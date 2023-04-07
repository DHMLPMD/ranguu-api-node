import { Router } from 'express'

import { restaurantOnboardingRoutes } from './onboarding'

const restaurantsRoutes = Router()
const controller = {}

restaurantsRoutes.use('/onboarding', restaurantOnboardingRoutes)

export { restaurantsRoutes }