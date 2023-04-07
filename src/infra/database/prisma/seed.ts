import {  Prisma, PrismaClient } from '@prisma/client'
import statesJson from './states.json'
import citiesJson from './cities.json'

import { admins as adminSeeds } from './admin'
import { hashPassword } from 'core/utils/functions'
import { appLogger } from 'core/utils/logger'

interface States {
    states: {
        name: string
        short_name: string
        key: number
    }[]
}

interface Cities {
    cities: {
        name: string,
        ibge_code: string
        state_key: number
    }[]
}

const createStatesAndCities = async (prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>) => {
    const { states } = statesJson as States
    const { cities } = citiesJson as Cities

    const existingData = await prisma.states.findMany({})

    if (existingData.length > 0)
        return

    await prisma.$transaction(async trx => {
        for (const singleState of states) {
            const createdState = await trx.states.create({
                data: {
                    name: singleState.name,
                    short_name: singleState.short_name,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            })

            const respectiveCities = cities.filter(item => item.state_key === singleState.key)
            await trx.cities.createMany({
                data: respectiveCities.map(item => ({
                    name: item.name,
                    ibge_code: item.ibge_code,
                    state_id: createdState.id,
                    created_at: new Date(),
                    updated_at: new Date()
                }))
            })
        }
    })
}

const createAdmins = async (prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>) => {
    const existingAdmins = await prisma.admins.findMany({
        where: {
            OR: adminSeeds.map(item => ({
                email: item.email
            }))
        }
    })

    if (existingAdmins.length > 0)
        existingAdmins.forEach(single => {
            adminSeeds.splice(adminSeeds.findIndex(adminSeed => adminSeed.email == single.email), 1)
        })

    await prisma.admins.createMany({
        data: await Promise.all(
            adminSeeds.map(async item => {
                const hashedPassword = await hashPassword(item.password_hash!)

                return {
                    name: item.name!,
                    email: item.email!,
                    phone: item.phone!,
                    document: item.document!,
                    password_hash: hashedPassword,
                    created_at: new Date(),
                    updated_at: new Date()
                }
            })
        )
    })

}

(async () => {
    const prisma = new PrismaClient()

    try {
        await createStatesAndCities(prisma)
        await createAdmins(prisma)

        await prisma.$disconnect()

        process.exit(0)
    } catch (error) {
        appLogger.error(
            error,
            'Errr on run prisma seed'
        )
        await prisma.$disconnect()
        process.exit(1)
    }
})()