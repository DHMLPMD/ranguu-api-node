import { Restaurants } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { randomUUID } from "crypto";

import AppError from "core/classes/errorHandler";
import { IRestaurantRepository } from "modules/restaurants/infra/database/repository/interface";
import { ITokenRepository } from "modules/tokens/infra/database/repository/interfaces";
import { UserRoleTypes } from "core/interfaces";

export class RefreshToken {
    constructor(
        private tokenRepo: ITokenRepository,
        private restaurantRepo: IRestaurantRepository,
    ) { }

    async execute(refreshToken: string) {
        try {
            const foundData = await this.tokenRepo.findOneByArgs({
                token: refreshToken
            })

            if (!foundData)
                throw new AppError('Operação inválida', 401, 'invalid_token')


            switch (foundData.entity as UserRoleTypes) {
                case 'restaurants':
                    const restaurant = await this.restaurantRepo.findOneByArgs({
                        id: foundData.entity_id,
                        is_active: true,
                        is_email_verified: true,
                    })

                    if (!restaurant)
                        throw new Error('Operação não permitida')

                    return await this.authUser(restaurant, foundData.entity, refreshToken)
                default: throw new Error('Operação não permitida')
            }
        } catch (error) {
            if (error instanceof AppError)
                throw error
            throw new AppError(error.message)
        }
    }


    private async authUser(user: Restaurants, entity: string, oldToken: string) {
        const token = sign(
            { role: entity },
            process.env.JWT_SECRET!,
            {
                subject: user.id,
                expiresIn: process.env.JWT_TTL!
            }
        )

        const newRefreshToken = randomUUID()

        await this.tokenRepo.updateOne({
            where: {
                entity_id: user.id,
                token: oldToken,
            },
            data: {
                token: newRefreshToken,
                updated_at: new Date(),
            }
        })

        return {
            token,
            refresh_token: newRefreshToken
        }
    }
}