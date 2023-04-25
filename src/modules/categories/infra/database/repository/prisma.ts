import { Prisma, Categories } from "@prisma/client";
import { ICategoryRepository } from "./interfaces";
import { PrismaConnection } from "core/classes/prismaClient";

export class PrismaCategoryRepository implements ICategoryRepository{
    
    async finManyByArgs(params: Prisma.CategoriesFindManyArgs): Promise<Categories[]> {
        const prisma = PrismaConnection.getClient()

        const result = await prisma.categories.findMany(params)

        return result
    }
    
    async create(params: Prisma.CategoriesCreateArgs): Promise<Categories> {
        const prisma = PrismaConnection.getClient()

        const created = await prisma.categories.create(params)

        return created
    }
    
}