import { Request, Response } from 'express'
import { AuthenticateAdmins } from 'modules/auth/services/AuthenticateAdmins'

import { AuthenticateRestaurants } from 'modules/auth/services/AuthenticateRestaurants'
import { FirebaseAuth } from 'modules/auth/services/Firebase'
import { RefreshToken } from 'modules/auth/services/RefreshToken'

export class AuthController {
    constructor(
        private authRestaurantService: AuthenticateRestaurants,
        private authAdminsService: AuthenticateAdmins,
        private refreshTokenService: RefreshToken,
        private firebaseService: FirebaseAuth
    ) { }

    async authRestaurants(request: Request, response: Response): Promise<Response>{
        const result = await this.authRestaurantService.execute(request.body)

        return response.json(result)
    }

    async authAdmins(request: Request, response: Response): Promise<Response>{
        const result = await this.authAdminsService.execute(request.body)
        
        return response.json(result)
    }

    async refreshToken(request: Request, response: Response): Promise<Response>{
        const result = await this.refreshTokenService.execute(
            request.body.refresh_token
        )

        return response.json(result)
    }

    async firebaseAuth(request: Request, response: Response): Promise<Response>{
        const result = await this.firebaseService.execute(request.user.id)

        return response.json(result)
    }
}