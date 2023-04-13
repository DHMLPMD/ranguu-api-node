import { Router } from 'express'
import { Joi, Segments, celebrate } from 'celebrate'
import { messages } from 'joi-translation-pt-br'

import { validTaxRegimes } from '../../../utils'
import { validateDocument } from 'core/utils/formatters/string'
import { createRestaurantOnboardingController } from 'modules/restaurants/factory/controllers'

const restaurantOnboardingRoutes = Router()
const controller = createRestaurantOnboardingController()

restaurantOnboardingRoutes.post(
    "/basic_data",
    celebrate({
        [Segments.BODY]: Joi.object({
            commom_name: Joi.string().max(350).required(),
            social_name: Joi.string().max(350).required(),
            document_number: Joi.string().regex(/^[0-9]*$/).min(11).max(14).custom(validateDocument).required(),
            email: Joi.string().email().max(200).required(),
            phone: Joi.string().regex(/^[0-9]*$/).min(10).max(11).required(),
            tax_regime: Joi.string().valid(...validTaxRegimes).required(),
            responsible_name: Joi.string().max(255).required(),
            responsible_document: Joi.string().regex(/^[0-9]*$/).min(11).max(14).custom(validateDocument).required(),
        })
    }, {
        abortEarly: false,
        messages
    }),
    (req, res) => controller.createBasicData(req, res)
)

restaurantOnboardingRoutes.get(
    '/basic_data/:restaurant_id',
    celebrate({
        [Segments.PARAMS]: Joi.object({
            restaurant_id: Joi.string().uuid().required(),
        })
    }, {
        abortEarly: false,
        messages
    }),
    (req, res) => controller.getBasicData(req, res)
)

restaurantOnboardingRoutes.post(
    '/address',
    celebrate({
        [Segments.BODY]: Joi.object({
            address: Joi.string().max(300).required(),
            number: Joi.string().max(100).required(),
            complement: Joi.string().max(150).allow('').default(''),
            neighborhood: Joi.string().max(150).required(),
            zip_code: Joi.string().length(8).regex(/^[0-9]*$/).required(),
            city_id: Joi.string().uuid().required(),
            restaurant_id: Joi.string().uuid().required(),
        })
    }, {
        abortEarly: false,
        messages,
    }),
    (req, res) => controller.createAddress(req, res)
)

export { restaurantOnboardingRoutes }