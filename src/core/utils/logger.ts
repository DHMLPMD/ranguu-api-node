import pino from 'pino'

export const appLogger = pino({
    timestamp: pino.stdTimeFunctions.isoTime,
    level: 'debug',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true
        }
    }
})