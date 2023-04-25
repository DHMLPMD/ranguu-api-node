import { Prisma, Admins } from "@prisma/client";
import { IAdminRepository } from "./interfaces";
import { PrismaConnection } from "core/classes/prismaClient";

export class PrismaAdminsRepository implements IAdminRepository {
    
    async findOneByArgs(args: Prisma.AdminsFindFirstArgs, throwIfNotExists: boolean = true): Promise<Admins | null> {
        const prisma = PrismaConnection.getClient()

        const found = await prisma.admins.findFirst(args)

        if(!found && throwIfNotExists)
            throw new Error('Dados não localizados')

        return found
    }

}
