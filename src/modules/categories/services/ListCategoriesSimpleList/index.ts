import AppError from "core/classes/errorHandler";
import { ICategoryRepository } from "modules/categories/infra/database/repository/interfaces";

export class ListCategoriesSimpleList {
    constructor(
        private repo: ICategoryRepository
    ) { }

    async execute() {
        try {
            const categories = await this.repo.finManyByArgs({
                where: {
                    is_active: true,
                },
                select: {
                    id: true,
                    description: true,
                    image: true
                }
            })

            return {
                categories
            }
        } catch (error) {
            throw new AppError(error.message)
        }
    }
}