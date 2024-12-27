import { getEnvironment } from './environment'
import { DEFAULT_DEV_PORTS, API_TIMEOUTS } from './constants'
import logger from '../logger'

export type ApiName = 'products-api' | 'users-api'

export const currentEnv = getEnvironment()

export const API_TIMEOUT = API_TIMEOUTS[currentEnv]

export const API_ENDPOINTS: Record<ApiName, string | undefined> = {
  'products-api': process.env.PRODUCTS_API_ENDPOINT,
  'users-api': process.env.USERS_API_ENDPOINT
}

export const API_KEYS: Record<ApiName, string | undefined> = {
  'products-api': process.env.PRODUCTS_API_KEY,
  'users-api': process.env.USERS_API_KEY
}

export const getApiEndpoint = (apiName: ApiName): string => {
  if (currentEnv === 'dev') {
    const endpoint = `http://localhost:${DEFAULT_DEV_PORTS[apiName]}`
    logger.debug({ apiName, endpoint }, 'Using development endpoint')
    return endpoint
  }

  const endpoint = API_ENDPOINTS[apiName]
  if (!endpoint) {
    logger.error({ apiName, environment: currentEnv }, 'No endpoint configured')
    throw new Error(`No endpoint configured for ${apiName} in ${currentEnv} environment`)
  }

  logger.debug({ apiName, endpoint }, 'Using configured endpoint')
  return endpoint
}

export const getApiKey = (apiName: ApiName): string => {
  const apiKey = API_KEYS[apiName]
  if (!apiKey) {
    logger.warn({ apiName }, 'No API key configured')
  }
  return apiKey || ''
}
