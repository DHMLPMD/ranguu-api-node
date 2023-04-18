import AppError from "core/classes/errorHandler";
import { ICityRepository } from "modules/cities/infra/database/repository/interfaces";
import { IGetCitiesEnabled } from "./interfaces";

export class GetCitiesEnabled {
    constructor(
        private repo: ICityRepository
    ){}

    async execute(params: IGetCitiesEnabled) {
        try {
            const result = await this.repo.findManyAndLoadDeps(
                params,
                {
                    id: true,
                    name: true,
                    is_enabled: true,
                    ibge_code: true,
                    state: {
                        select: {
                            id: true,
                            name: true,
                            short_name: true
                        }
                    }
                }
            )

            return result
        } catch(error){
            throw new AppError(error.message)
        }
    }
}