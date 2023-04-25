import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'
import { ensureAuth } from 'infra/http/middlewares/ensureAuth'
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

authRoutes.post(
    '/admin',
    celebrate({
        [Segments.BODY]: Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        })
    }, {
        abortEarly: false,
        messages
    }),
    (req, res) => controller.authAdmins(req, res)
)

authRoutes.put(
    '/refresh_token',
    celebrate({
        [Segments.BODY]: Joi.object({
            refresh_token: Joi.string().uuid().required(),
        })
    }, {
        abortEarly: false,
        messages
    }),
    (req, res) => controller.refreshToken(req, res)
)

authRoutes.put(
    '/firebase',
    ensureAuth,
    (req, res) => controller.firebaseAuth(req, res)
)

export { authRoutes }