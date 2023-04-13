import { Prisma, RestaurantOnboardingStatus } from "@prisma/client";
import { IRestaurantOnboardingRepository } from "./interface";
import { PrismaConnection } from "core/classes/prismaClient";

export class PrismaRestaurantOnboardingStatusRepository implements IRestaurantOnboardingRepository {

    async findByRestaurantId(restaurantId: string): Promise<RestaurantOnboardingStatus[]> {
        const prisma = PrismaConnection.getClient()

        const steps = await prisma.restaurantOnboardingStatus.findMany({
            where: {
                restaurant_id: restaurantId
            }
        })

        return steps
    }

    async createOne(params: Prisma.RestaurantOnboardingStatusCreateArgs): Promise<RestaurantOnboardingStatus> {
        const prisma = PrismaConnection.getClient()
        const { data } = params

        const created = await prisma.restaurantOnboardingStatus.create({
            data: {
                ...data,
                created_at: new Date(),
                updated_at: new Date(),
            }
        })

        return created
    }
}