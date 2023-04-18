import { Prisma, Cities } from "@prisma/client";
import { ICityRepository } from "./interfaces";
import { PrismaConnection } from "core/classes/prismaClient";
import { IGetCitiesEnabled } from "modules/cities/services/GetCitiesEnabled/interfaces";
import { IResultList } from "core/interfaces";

export class PrismaCityRepository implements ICityRepository {

    async findOneByArgs(params: Prisma.CitiesWhereInput, selectFields?: Prisma.CitiesSelect | undefined, throwIfNotExists: boolean = true): Promise<Cities | null> {
        const prisma = PrismaConnection.getClient()

        const found = await prisma.cities.findFirst({
            where: params,
            select: selectFields,
        })

        if (!found && throwIfNotExists)
            throw new Error('Dados da cidade não localizados')

        return found as Cities
    }

    async findManyAndLoadDeps(params: IGetCitiesEnabled, selectParams: Prisma.CitiesSelect): Promise<IResultList<Cities>> {
        const prisma = PrismaConnection.getClient()

        const {
            page,
            page_offset,
            name,
        } = params

        let pagination: number
        let currentPage: number

        if (page > 0) {
            pagination = page - 1
            currentPage = page
        } else {
            pagination = 0
            currentPage = 1
        }

        let whereArgs: Prisma.CitiesWhereInput = {
            is_enabled: true
        }

        if (name) {
            whereArgs = {
                ...whereArgs,
                AND: {
                    name: {
                        contains: name,
                        mode: 'insensitive'
                    }
                }
            }
        }

        const [
            { _count },
            result
        ] = await Promise.all([
            prisma.cities.aggregate({
                where: whereArgs,
                _count: true,
            }),
            prisma.cities.findMany({
                select: selectParams,
                where: whereArgs,
                take: page_offset,
                skip: pagination * page_offset
            })
        ])

        return {
            results: result as any,
            total: _count,
            page: currentPage,
            offset: page_offset,
            total_pages: Math.ceil(_count / page_offset)
        }
    }

}