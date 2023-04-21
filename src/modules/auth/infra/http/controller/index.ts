import { Request, Response } from 'express'
import { AuthenticateRestaurants } from 'modules/auth/services/AuthenticateRestaurants'

export class AuthController {
    constructor(
        private authRestaurantService: AuthenticateRestaurants
    ) { }

    async authRestaurants(request: Request, response: Response): Promise<Response>{
        const result = await this.authRestaurantService.execute(request.body)

        return response.json(result)
    }
}