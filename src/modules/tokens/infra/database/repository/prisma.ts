import { PrismaConnection } from "core/classes/prismaClient";
import { ITokenRepository } from "./interfaces";
import { Prisma, Tokens } from "@prisma/client";

export class PrismaTokensRepository implements ITokenRepository {

    async updateOne(params: Prisma.TokensUpdateManyArgs): Promise<boolean> {
        const prisma = PrismaConnection.getClient()

        await prisma.tokens.updateMany(params)
        
        return true
    }

    async findOneByArgs(params: Prisma.TokensWhereInput): Promise<Tokens | null> {
        const prisma = PrismaConnection.getClient()

        const found = await prisma.tokens.findFirst({
            where: params
        })

        return found
    }
    
    async createOne(entity: string, entityId: string, token: string): Promise<void> {
        const prisma = PrismaConnection.getClient()

        await prisma.tokens.create({
            data: {
                entity,
                entity_id: entityId,
                token,
                created_at: new Date(),
                updated_at: new Date()
            }
        })
    }

}