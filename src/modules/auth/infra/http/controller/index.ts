import { Request, Response } from 'express'

import { AuthenticateRestaurants } from 'modules/auth/services/AuthenticateRestaurants'
import { RefreshToken } from 'modules/auth/services/RefreshToken'

export class AuthController {
    constructor(
        private authRestaurantService: AuthenticateRestaurants,
        private refreshTokenService: RefreshToken
    ) { }

    async authRestaurants(request: Request, response: Response): Promise<Response>{
        const result = await this.authRestaurantService.execute(request.body)

        return response.json(result)
    }

    async refreshToken(request: Request, response: Response): Promise<Response>{
        const result = await this.refreshTokenService.execute(
            request.body.refresh_token
        )

        return response.json(result)
    }
}