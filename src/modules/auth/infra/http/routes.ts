import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'
import { messages } from 'joi-translation-pt-br'
import { createAuthController } from 'modules/auth/factory/create_controller'

const authRoutes = Router()
const controller = createAuthController()

authRoutes.post(
    '/restaurant',
    celebrate({
        [Segments.BODY]: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        })
    }, {
        abortEarly: false,
        messages
    }),
    (req, res) => controller.authRestaurants(req, res)
)

export { authRoutes }