import { Request, Response} from 'express'
import { GetCitiesEnabled } from 'modules/cities/services/GetCitiesEnabled'

export class CitiesController {
    constructor(
        private getCitiesEnabledService: GetCitiesEnabled
    ){}

    async getEnableds(request: Request, response: Response): Promise<Response> {
        const result = await this.getCitiesEnabledService.execute(
            request.query as any
        )

        return response.json(result)
    }
}