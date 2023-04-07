import { Request, Response, NextFunction } from 'express'
import { TokenExpiredError, verify } from 'jsonwebtoken'

import AppError from '../../../core/classes/errorHandler'
import { ITokenPayload } from '../types'

const ensureAuth = (request: Request, response: Response, next: NextFunction) => {
    const authHeader = request.headers.authorization

    if (!authHeader)
        throw new AppError('JWT is missing', 401)

    try {
        const [_, jwt] = authHeader.split(' ')
        const { sub, role } = <ITokenPayload>verify(jwt, process.env.JWT_SECRET!)

        request.user = {
            id: sub,
            role
        }

        return next()
    } catch (error) {
        if (error instanceof AppError)
            throw error
        if (error instanceof TokenExpiredError)
            throw new AppError('JWT expired', 401)

        throw new AppError('Invalid JWT', 401)
    }
}

export { ensureAuth }