import { Prisma, RestaurantOnboardingStatus, Restaurants } from "@prisma/client";
import { IRestaurantRepository } from "./interface";
import { PrismaConnection } from "core/classes/prismaClient";

export class PrismaRestaurantsRepository implements IRestaurantRepository {
    async initiateOnboarding(restaurantCreateParams: Prisma.RestaurantsCreateArgs, onboardingSteps: Partial<RestaurantOnboardingStatus>[]): Promise<Restaurants> {
        const prisma = PrismaConnection.getClient()
        let created: Restaurants = {} as any

        await prisma.$transaction(async transaction => {
            const { data: restaurantCreateData } = restaurantCreateParams

            created = await transaction.restaurants.create({
                data: {
                    ...restaurantCreateData,
                    created_at: new Date(),
                    updated_at: new Date(),
                }
            })

            await transaction.restaurantOnboardingStatus.createMany({
                data: onboardingSteps.map(step => ({
                    ...step,
                    restaurant_id: created.id,
                    created_at: new Date(),
                    updated_at: new Date(),
                }) as any)
            })
        })
        
        return created
    }

    async findOneByArgs(params: Prisma.RestaurantsWhereInput, selectFields?: Prisma.RestaurantsSelect | undefined, throwIfNotExists = true): Promise<Restaurants> {
        const prisma = PrismaConnection.getClient()

        const found = await prisma.restaurants.findFirst({
            where: params,
            select: selectFields
        })

        if (!found && throwIfNotExists)
            throw new Error('Dados do restaurante não localizados')

        return found as Restaurants
    }

    async createOne(params: Prisma.RestaurantsCreateArgs): Promise<Restaurants> {
        const prisma = PrismaConnection.getClient()

        const created = await prisma.restaurants.create({
            data: {
                ...params.data,
                created_at: new Date(),
                updated_at: new Date()
            }
        })

        return created
    }

    async updateOne(params: Prisma.RestaurantsUpdateArgs): Promise<boolean> {
        const prisma = PrismaConnection.getClient()
        const { data, where } = params

        await prisma.restaurants.updateMany({
            where,
            data: {
                ...data,
                created_at: new Date(),
                updated_at: new Date(),
            },
        })

        return true
    }

}