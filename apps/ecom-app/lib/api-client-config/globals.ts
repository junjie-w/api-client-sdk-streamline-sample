import { getEnvironment } from './environment'
import { DEFAULT_DEV_PORTS, API_TIMEOUTS, API_ENDPOINTS } from './constants'

export type ApiName = 'products-api' | 'users-api'

export const currentEnv = getEnvironment()

export const API_TIMEOUT = API_TIMEOUTS[currentEnv]

export const getApiEndpoint = (apiName: ApiName): string => {
  if (currentEnv === 'dev') {
    return `http://localhost:${DEFAULT_DEV_PORTS[apiName]}`
  }

  const endpoint = API_ENDPOINTS[apiName]
  if (!endpoint) {
    throw new Error(`No endpoint configured for ${apiName} in ${currentEnv} environment`)
  }

  return endpoint
}
