import 'reflect-metadata'
import 'express-async-errors'
import 'dotenv/config'

import express from 'express'
import morgan from 'morgan'
import { errors } from 'celebrate'
import cors from 'cors'
import helmet from 'helmet'
import { handleNotFound } from './middlewares/notFound'
import globalErrorsHandling from './middlewares/globalErrors'
import { apiRoutes } from './routes'
import '../database/redis'

const server = express()

server.use(cors())
server.use(helmet())
server.use(express.json())
server.use(express.urlencoded({ extended: true }))

switch(process.env.NODE_ENV!){
    case 'dev':
        server.use(morgan('dev'))
        break
    case 'staging':
        server.use(morgan('common'))
        break
    case 'production':
        server.use(morgan('common'))
        break
    default: break
}

server.use('/api', apiRoutes)
server.use(errors())
server.use(handleNotFound)
server.use(globalErrorsHandling)
export { server }