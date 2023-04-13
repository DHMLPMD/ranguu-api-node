import { Prisma, Cities } from "@prisma/client";
import { ICityRepository } from "./interfaces";
import { PrismaConnection } from "core/classes/prismaClient";

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

}