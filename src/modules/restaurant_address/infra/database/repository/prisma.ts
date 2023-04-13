import { Prisma, RestaurantAddresses } from "@prisma/client";
import { IRestaurantAddressRepository } from "./interfaces";
import { PrismaConnection } from "core/classes/prismaClient";
import { eRestaurantOnboardingSteps } from "modules/restaurant_onboardings/utils";

export class PrismaRestaurantAddressRepository implements IRestaurantAddressRepository {

    async updateOne(params: Prisma.RestaurantAddressesUpdateArgs): Promise<boolean> {
        const prisma = PrismaConnection.getClient()

        await prisma.restaurantAddresses.update(params)

        return true
    }

    async createAddressOnboarding(params: Prisma.RestaurantAddressesCreateArgs): Promise<RestaurantAddresses> {
        const prisma = PrismaConnection.getClient()
        let created: RestaurantAddresses = {} as any

        await prisma.$transaction(async transaction => {
            created = await transaction.restaurantAddresses.create({
                data: {
                    ...params.data,
                    created_at: new Date(),
                    updated_at: new Date(),
                }
            })

            await transaction.restaurantOnboardingStatus.updateMany({
                where: {
                    restaurant_id: params.data.restaurant_id!,
                    step_key: eRestaurantOnboardingSteps.ADDRESS_DATA
                },
                data: {
                    status: true,
                    completed_at: new Date(),
                    updated_at: new Date(),
                }
            })
        })

        return created
    }

    async findOneByArgs(params: Prisma.RestaurantAddressesWhereInput, selectFields?: Prisma.RestaurantAddressesSelect | undefined, throwIfNotExists: boolean = true): Promise<RestaurantAddresses | null> {
        const prisma = PrismaConnection.getClient()

        const found = await prisma.restaurantAddresses.findFirst({
            where: params,
            select: selectFields
        })

        if (!found && throwIfNotExists)
            throw new Error('Dados de endereço não localizados')

        return found as RestaurantAddresses
    }

}