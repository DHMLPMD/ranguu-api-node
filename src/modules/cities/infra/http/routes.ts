import { Joi, Segments, celebrate } from 'celebrate'
import { Router } from 'express'
import { messages } from 'joi-translation-pt-br'
import { createCitiesController } from 'modules/cities/factory/create_controller'

const cityRoutes = Router()
const controller = createCitiesController()

cityRoutes.get(
    '/enableds',
    celebrate({
        [Segments.QUERY]: Joi.object({
            name: Joi.string(),
            page: Joi.number().greater(0).default(0),
            page_offset: Joi.number().greater(0).default(30)
        })
    }, {
        messages
    }),
    (req, res) => controller.getEnableds(req, res)
)

export { cityRoutes }