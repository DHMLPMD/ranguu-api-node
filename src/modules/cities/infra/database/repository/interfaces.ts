import { Cities, Prisma } from "@prisma/client";

export interface ICityRepository {
    findOneByArgs(params: Prisma.CitiesWhereInput, selectFields?: Prisma.CitiesSelect, throwIfNotExists?: boolean): Promise<Cities | null>
    
}