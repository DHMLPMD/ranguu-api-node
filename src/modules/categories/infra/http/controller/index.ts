import { Request, Response} from 'express'

import { CreateCategory } from 'modules/categories/services/CreateCategory'

export class CategoryController {
    constructor(
        private createCategoryService: CreateCategory
    ){}

    async create(request: Request, response: Response): Promise<Response>{
        const result = await this.createCategoryService.execute(
            request.body
        )

        return response.status(201).json(result)
    }
}