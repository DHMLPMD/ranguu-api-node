import { Request, Response, NextFunction } from 'express'
import { AssertionError } from 'assert'

import AppError from '../../../core/classes/errorHandler'
import { PrismaErrorHandler } from '../../../core/classes/prismaErrorHandler'

export default function dealGlobalError(error: Error, request: Request, response: Response, next: NextFunction) {

    if (error instanceof AppError) {
        return response.status(error.status_code).json({
            error_code: error.error_code,
            message: error.message,
        })
    } else if(error instanceof PrismaErrorHandler){
        return response.status(error.status_code).json({
            error_code: error.error_code,
            message: error.message
        })
    } else if (error instanceof AssertionError) {
        return response.status(400).json({
            error_code: 'error',
            message: error,
        })
    }

    console.error(`Erro interno do servidor: ${error}`)

    return response.status(500).json({
        message: 'Internal Server Error'
    })
}