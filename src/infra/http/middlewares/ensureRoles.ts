import { Request, Response, NextFunction } from "express"

import AppError from "../../../core/classes/errorHandler"
import { eRoleAccessType } from "../../../core/enums"
import { PrismaAdminsRepository } from "../../../modules/admins/infra/database/repository/prisma"
import { PrismaTrafficAgentRepository } from "../../../modules/traffic_agents/infra/database/repository/prisma"


const verifyAdmin = async (id: string) => {
    const adminRepo = new PrismaAdminsRepository()

    const found = await adminRepo.findOneByArgs({
        id,
        is_active: true
    })

    if (!found)
        throw new AppError('Does not have permission', 401)
}

const verifyTrafficAgent = async (id: string) => {
    const trafficAgentRepo = new PrismaTrafficAgentRepository()

    const found = await trafficAgentRepo.findOneByArgs({
        id,
        is_active: true
    })

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
                case 'traffic_agent':
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