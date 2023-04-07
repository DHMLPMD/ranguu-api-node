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

export { restaurantOnboardingRoutes }