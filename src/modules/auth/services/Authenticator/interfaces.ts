import { Admins, Restaurants } from "@prisma/client"
import { UserRoleTypes } from "core/interfaces"

export interface IResultAuthenticator {
    token: string
    refresh_token: string
}

export interface IAuthenticatorService {
    execute(user: Restaurants | Admins, password: string, role: UserRoleTypes): Promise<IResultAuthenticator>
}