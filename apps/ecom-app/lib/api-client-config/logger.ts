import pino from 'pino'
import { isDevelopment } from '@/lib/utils/env'

const logger = pino({
  level: isDevelopment() ? 'debug' : 'info',
  browser: {
    serialize: true,
  },
  timestamp: isDevelopment() 
    ? () => `,"time":"${new Date().toISOString()}"` 
    : undefined,
})

export default logger

// Example usage in code:
// logger.info({ someData: 'value' }, 'Message here')
// logger.error({ err: error }, 'Error occurred')
// logger.debug({ config: someConfig }, 'Debug info')