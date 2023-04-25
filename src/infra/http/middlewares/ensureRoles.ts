import { Request, Response, NextFunction } from "express"

import { eRoleAccessType } from "core/enums"
import AppError from "core/classes/errorHandler"
import { PrismaAdminsRepository } from "modules/admins/infra/database/repository/prisma"
import { PrismaRestaurantsRepository } from "modules/restaurants/infra/database/repository/prisma"



const verifyAdmin = async (id: string) => {
    const adminRepo = new PrismaAdminsRepository()

    const found = await adminRepo.findOneByArgs(
        {
            where: {
                id,
            }
        },
        false
    )

    if (!found)
        throw new AppError('Does not have permission', 401)
}

const verifyTrafficAgent = async (id: string) => {
    const restaurantRepo = new PrismaRestaurantsRepository()

    const found = await restaurantRepo.findOneByArgs(
        {
            id,
            is_active: true
        },
        undefined,
        false
    )

    if (!found)
        throw new AppError('Does not have permission', 401)
}

export const grantIs = (roles: string[]) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            const { id, role } = request.user as { id: string, role: eRoleAccessType }

            if (!roles.includes(role))
                throw new AppError('Does not have permission', 401)

            switch (role) {
                case 'admin':
                    await verifyAdmin(id)
                    break
                case 'restaurant':
                    await verifyTrafficAgent(id)
                    break
                default: throw new AppError('Does not have permission', 401)
            }

            return next()
        } catch (error) {
            if (error instanceof AppError)
                throw error
            throw new AppError(error.message)
        }
    }
}