import { PrismaCategoryRepository } from "../infra/database/repository/prisma"
import { CategoryController } from "../infra/http/controller"
import { CreateCategory } from "../services/CreateCategory"

export const createCategoryController = () => {
    const repo = new PrismaCategoryRepository()

    const createCategory = new CreateCategory(repo)

    const controller = new CategoryController(
        createCategory
    )
    return controller
}