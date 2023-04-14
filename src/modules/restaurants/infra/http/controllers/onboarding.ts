import { Request, Response } from 'express'

import { CreateAddressData } from 'modules/restaurants/services/_onboarding/CreateAddressData'
import { CreateBasicData } from 'modules/restaurants/services/_onboarding/CreateBasicData'
import { GetAddressData } from 'modules/restaurants/services/_onboarding/GetAddressData'
import { GetBasicData } from 'modules/restaurants/services/_onboarding/GetBasicData'
import { GetLastStep } from 'modules/restaurants/services/_onboarding/GetLastStep'

export class RestaurantOnboardingController {
    constructor(
        private createBasicDataService: CreateBasicData,
        private getBasicDataService: GetBasicData,
        private createAddressService: CreateAddressData,
        private getAddressService: GetAddressData,
        private getLastStepService: GetLastStep
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

    async getAddress(request: Request, response: Response): Promise<Response> {
        const result = await this.getAddressService.execute(request.params.restaurant_id)

        return response.json(result)
    }

    async getLastStep(request: Request, response: Response): Promise<Response> {
        const result = await this.getLastStepService.execute(request.params.restaurant_id)

        return response.json(result)
    }
}