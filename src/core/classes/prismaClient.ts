import { PrismaClient } from "@prisma/client";

export class PrismaConnection {
    private static Prisma: PrismaClient

    static getClient() {
        if (!this.Prisma === null || !this.Prisma)
            this.Prisma = new PrismaClient({
                log: process.env.QUERY_DEBUG_ENABLED! === 'true'
                    ? [
                        {
                            emit: 'event',
                            level: 'query'
                        }
                    ]
                    : []
            })

        if(process.env.QUERY_DEBUG_ENABLED! == 'true')
            this.Prisma.$on('query' as any, (event: any) => {
                console.log(`${event.query} ${event.params}`)
            })
        return this.Prisma
    }
}