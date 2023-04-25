import AppError from "core/classes/errorHandler";
import { IAdminRepository } from "modules/admins/infra/database/repository/interfaces";
import { IParamsAuth } from "modules/auth/utils/interfaces";
import { IAuthenticatorService } from "../Authenticator/interfaces";

export class AuthenticateAdmins {
    constructor(
        private repo: IAdminRepository,
        private authService: IAuthenticatorService
    ) { }

    async execute(params: IParamsAuth) {
        try {
            const admins = await this.repo.findOneByArgs(
                {
                    where: {
                        email: params.email
                    }
                },
                false
            )
                
            if(!admins)
                throw new AppError('Email ou senha inválidos', 401)

            const result = await this.authService.execute(
                admins,
                params.password,
                'admin'
            )

            return result
        } catch (error) {
            if (error instanceof AppError)
                throw error

            throw new AppError(error.message)
        }
    }
}