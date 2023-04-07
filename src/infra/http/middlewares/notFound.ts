import { Request, Response, NextFunction } from 'express'
import AppError from '../../../core/classes/errorHandler'

export const handleNotFound = (request: Request, response: Response, next: NextFunction) => {
    throw new AppError(
        "Unless that you've invented the time machinne, this endpoint doesn't exist",
        404
    )
}