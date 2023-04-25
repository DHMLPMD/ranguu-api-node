import AppError from "core/classes/errorHandler";
import { IParamsCreateCategory } from "./interfaces";
import { ICategoryRepository } from "modules/categories/infra/database/repository/interfaces";

export class CreateCategory {
    constructor(
        private repo: ICategoryRepository
    ) { }

    async execute(params: IParamsCreateCategory) {
        try {
            const { id } = await this.repo.create({
                data: {
                    ...params,
                    created_at: new Date(),
                    updated_at: new Date(),
                }
            })

            return {
                id
            }
        } catch (error) {
            throw new AppError(error.message)
        }
    }
}