import { Cities, Prisma } from "@prisma/client";
import { IResultList } from "core/interfaces";
import { IGetCitiesEnabled } from "modules/cities/services/GetCitiesEnabled/interfaces";

export interface ICityRepository {
    findManyAndLoadDeps(params: IGetCitiesEnabled, selectParams: Prisma.CitiesSelect): Promise<IResultList<Cities>>;
    findOneByArgs(params: Prisma.CitiesWhereInput, selectFields?: Prisma.CitiesSelect, throwIfNotExists?: boolean): Promise<Cities | null>
    
}