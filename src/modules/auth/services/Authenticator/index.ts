import { Admins, Restaurants } from "@prisma/client";
import { sign } from "jsonwebtoken";
import { compare as passwordCompare } from 'bcryptjs'
import { randomUUID } from 'node:crypto'

import AppError from "core/classes/errorHandler";
import { UserRoleTypes } from "core/interfaces";
import { ITokenRepository } from "modules/tokens/infra/database/repository/interfaces";
import { IAuthenticatorService, IResultAuthenticator } from "./interfaces";

export class Authenticator implements IAuthenticatorService {
    constructor(
        private tokenRepo: ITokenRepository
    ) { }

    async execute(user: Restaurants | Admins, password: string, role: UserRoleTypes): Promise<IResultAuthenticator> {
        const matchedResult = await passwordCompare(password, user.password_hash!)

        if (!matchedResult)
            throw new AppError('Email ou senha inválidos', 401)

        //@ts-ignore
        delete user.password_hash

        const token = sign(
            { role },
            process.env.JWT_SECRET!,
            {
                subject: user.id,
                expiresIn: process.env.JWT_TTL!
            }
        )

        const refresh_token = randomUUID()

        await this.tokenRepo.createOne(
            role,
            user.id,
            refresh_token
        )

        return {
            token,
            refresh_token
        }
    }
}