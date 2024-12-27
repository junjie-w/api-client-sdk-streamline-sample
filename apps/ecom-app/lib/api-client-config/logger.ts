import pino from 'pino'
import { Environment, isDev, isQa } from './environment'
import { currentEnv } from './globals'

const LOG_LEVELS: Record<Environment, string> = {
  dev: 'debug',
  qa: 'debug',
  prod: 'info'
}

const logger = pino({
  level: LOG_LEVELS[currentEnv],
  browser: {
    serialize: true,
  },
  timestamp: isDev() || isQa()
    ? () => `,"time":"${new Date().toISOString()}"` 
    : undefined,
})

export default logger
