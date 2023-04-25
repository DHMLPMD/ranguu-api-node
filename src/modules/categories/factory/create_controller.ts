import { PrismaCategoryRepository } from "../infra/database/repository/prisma"
import { CategoryController } from "../infra/http/controller"
import { CreateCategory } from "../services/CreateCategory"
import { ListCategoriesSimpleList } from "../services/ListCategoriesSimpleList"

export const createCategoryController = () => {
    const repo = new PrismaCategoryRepository()

    const createCategory = new CreateCategory(repo)
    const simpleList = new ListCategoriesSimpleList(repo)

    const controller = new CategoryController(
        createCategory,
        simpleList
    )
    return controller
}