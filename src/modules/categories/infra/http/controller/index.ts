import { Request, Response} from 'express'

import { CreateCategory } from 'modules/categories/services/CreateCategory'
import { ListCategoriesSimpleList } from 'modules/categories/services/ListCategoriesSimpleList'

export class CategoryController {
    constructor(
        private createCategoryService: CreateCategory,
        private simpleListService: ListCategoriesSimpleList
    ){}

    async create(request: Request, response: Response): Promise<Response>{
        const result = await this.createCategoryService.execute(
            request.body
        )

        return response.status(201).json(result)
    }

    async simpleList(request: Request, response: Response): Promise<Response>{
        const result = await this.simpleListService.execute()

        return response.json(result)
    }
}