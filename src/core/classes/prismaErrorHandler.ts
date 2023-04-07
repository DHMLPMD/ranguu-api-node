import { PrismaClientKnownRequestError } from "@prisma/client/runtime"

export class PrismaErrorHandler {
    public readonly message: string
    public readonly error_code: string
    public readonly status_code: number

    constructor(error: PrismaClientKnownRequestError) {
        const { code, meta } = error

        this.status_code = 400

        //Unique constraint
        if (code === 'P2002') {
            const { target } = meta as { target: string[] }

            this.error_code = 'unique_constraint_error',
            this.message =  `Os dados para: ${target.join(',')} já foram registrados`
        }
    }
}