import { Restaurants } from "@prisma/client"
import { UserRoleTypes } from "core/interfaces"

export interface IResultAuthenticator {
    token: string
    refresh_token: string
}

export interface IAuthenticatorService {
    execute(user: Restaurants, password: string, role: UserRoleTypes): Promise<IResultAuthenticator>
}