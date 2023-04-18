import { Request, Response } from 'express'

import { AssignPassword } from 'modules/restaurants/services/_onboarding/AssignPassword'
import { CreateAddressData } from 'modules/restaurants/services/_onboarding/CreateAddressData'
import { CreateBasicData } from 'modules/restaurants/services/_onboarding/CreateBasicData'
import { GetAddressData } from 'modules/restaurants/services/_onboarding/GetAddressData'
import { GetBasicData } from 'modules/restaurants/services/_onboarding/GetBasicData'
import { GetLastStep } from 'modules/restaurants/services/_onboarding/GetLastStep'
import { ResendCode } from 'modules/restaurants/services/_onboarding/ResendCode'

export class RestaurantOnboardingController {
    constructor(
        private createBasicDataService: CreateBasicData,
        private getBasicDataService: GetBasicData,
        private createAddressService: CreateAddressData,
        private getAddressService: GetAddressData,
        private getLastStepService: GetLastStep,
        private assignPasswordService: AssignPassword,
        private resendCodeService: ResendCode
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

    async assignPassword(request: Request, response: Response): Promise<Response> {
        const result = await this.assignPasswordService.execute(
            request.body
        )

        return response.json(result)
    }

    async resendCode(request: Request, response: Response): Promise<Response> {
        const result = await this.resendCodeService.execute(
            request.params.restaurant_id
        )

        return response.json(result)
    }
}