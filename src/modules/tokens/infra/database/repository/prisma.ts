import { PrismaConnection } from "core/classes/prismaClient";
import { ITokenRepository } from "./interfaces";

export class PrismaTokensRepository implements ITokenRepository {
    
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