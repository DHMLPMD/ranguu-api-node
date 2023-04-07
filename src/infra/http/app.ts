import { appLogger } from 'core/utils/logger'
import { server } from './server'

server.listen(process.env.PORT || 3333, () => {
    appLogger.info(`Server running: ${process.env.PORT || 3333}`)
})