import { Categories, Prisma } from "@prisma/client";
import { IParamsCreateCategory } from "modules/categories/services/CreateCategory/interfaces";

export interface ICategoryRepository {
    create(params: Prisma.CategoriesCreateArgs): Promise<Categories>;

}