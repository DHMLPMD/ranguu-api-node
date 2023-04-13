import { Request, Response } from 'express'
import { CreateAddressData } from 'modules/restaurants/services/_onboarding/CreateAddressData'
import { CreateBasicData } from 'modules/restaurants/services/_onboarding/CreateBasicData'
import { GetBasicData } from 'modules/restaurants/services/_onboarding/GetBasicData'

export class RestaurantOnboardingController {
    constructor(
        private createBasicDataService: CreateBasicData,
        private getBasicDataService: GetBasicData,
        private createAddressService: CreateAddressData
    ) { }

    async createBasicData(request: Request, response: Response): Promise<Response> {
        const result = await this.createBasicDataService.execute(
            request.body
        )

        return response.status(201).json(result)
    }

    async getBasicData(request: Request, response: Response): Promise<Response> {
        const result = await this.getBasicDataService.execute(request.params.restaurant_id)

        return response.json(result)
    }

    async createAddress(request: Request, response: Response): Promise<Response> {
        const result = await this.createAddressService.execute(
            request.body
        )

        return response.status(201).json(result)
    }
}