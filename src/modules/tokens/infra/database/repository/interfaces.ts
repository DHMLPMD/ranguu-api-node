import { Prisma } from '@prisma/client'
import { Tokens } from "@prisma/client"

export interface ITokenRepository {
    updateOne(params: Prisma.TokensUpdateManyArgs): Promise<boolean>
    findOneByArgs(params: Prisma.TokensWhereInput): Promise<Tokens | null>
    createOne(entity: string, entityId: string, token: string): Promise<void>
}