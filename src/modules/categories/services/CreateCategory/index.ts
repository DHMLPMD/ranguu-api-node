import AppError from "core/classes/errorHandler";
import { IParamsCreateCategory } from "./interfaces";
import { ICategoryRepository } from "modules/categories/infra/database/repository/interfaces";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { PrismaErrorHandler } from "core/classes/prismaErrorHandler";

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
            if(error instanceof PrismaClientKnownRequestError)
                throw new PrismaErrorHandler(error)
            if(error.code && error.code == 'P2002')
                throw new PrismaErrorHandler(error)
            throw new AppError(error.message)
        }
    }
}