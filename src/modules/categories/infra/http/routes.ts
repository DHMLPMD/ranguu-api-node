import { Router } from 'express'
import { Joi, Segments, celebrate } from 'celebrate'
import { messages } from 'joi-translation-pt-br'

import { grantIs } from 'infra/http/middlewares/ensureRoles'
import { verifyPathFiles } from 'core/utils/formatters/string'
import { createCategoryController } from 'modules/categories/factory/create_controller'
import { eRoleAccessType } from 'core/interfaces'

const categoryRoutes = Router()
const controller = createCategoryController()

categoryRoutes.post(
    '/',
    grantIs([eRoleAccessType.ADMIN]),
    celebrate({
        [Segments.BODY]: Joi.object({
            description: Joi.string().max(350).required(),
            image: Joi.string().max(650).custom(verifyPathFiles),
        })
    }, {
        abortEarly: false,
        messages
    }),
    (req, res) => controller.create(req, res)
)

export { categoryRoutes }
