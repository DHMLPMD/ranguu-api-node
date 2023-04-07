import { Request, Response } from 'express'
import { CreateBasicData } from 'modules/restaurants/services/_onboarding/CreateBasicData'

export class RestaurantOnboardingController {
    constructor(
        private createBasicDataService: CreateBasicData
    ) { }

    async createBasicData(request: Request, response: Response): Promise<Response> {
        const result = await this.createBasicDataService.execute(
            request.body
        )

        return response.status(201).json(result)
    }
}