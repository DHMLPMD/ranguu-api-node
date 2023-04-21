import AppError from "core/classes/errorHandler";
import { IParamsAuth } from "modules/auth/utils/interfaces";
import { IRestaurantRepository } from "modules/restaurants/infra/database/repository/interface";
import { IAuthenticatorService } from "../Authenticator/interfaces";

export class AuthenticateRestaurants {
    constructor(
        private repo: IRestaurantRepository,
        private authService: IAuthenticatorService
    ){}

    async execute(params: IParamsAuth){
        try {
            const restaurant = await this.repo.findOneByArgs(
                {
                    email: params.email,
                    is_active: true,
                    is_email_verified: true,
                },
                undefined,
                false
            )

            if(!restaurant)
                throw new AppError('Email ou senha inválidos', 401)

            const result = await this.authService.execute(
                restaurant!,
                params.password,
                'restaurants'
            )

            return result
        } catch(error){ 
            if(error instanceof AppError)
                throw error

            throw new AppError(error.message)
        }
    }
}