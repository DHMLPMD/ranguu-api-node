import { createClient, RedisClientOptions, RedisClientType, RedisModules } from 'redis'
import { appLogger } from '../../../core/utils/logger'

export let redisClient: RedisClientType | null

(async () => {
    let connectionOptions: RedisClientOptions<RedisModules, Record<string, never>, Record<string, never>> = {
        url: process.env.REDIS_TLS_URL!,
        socket: {
            reconnectStrategy: attempts => {
                return Math.min(attempts * 100, 3000)
            },
        }
    }

    if (process.env.REDIS_TLS! == 'true')
        connectionOptions.socket = {
            ...connectionOptions.socket,
            tls: true,
            rejectUnauthorized: false
        }

    redisClient = createClient(connectionOptions)
    
    redisClient.on('connect', () => {
        appLogger.info('REDIS -> Connected')
    })

    redisClient.on('ready', () => {
        appLogger.info('REDIS -> Redis Client is ready!')
    })

    redisClient.on('end', () => {
        appLogger.info('REDIS -> connection has been closed')
    })

    redisClient.on('error', error=> {
        appLogger.info(`REDIS -> client error: ${JSON.stringify(error)}`)
    })

    redisClient.on('reconnecting', () => console.log('tentando reconnectar'))
    await redisClient.connect()    
})()