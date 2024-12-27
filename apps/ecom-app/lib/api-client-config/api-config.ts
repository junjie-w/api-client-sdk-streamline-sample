import { Configuration } from '@api-client-sdk-streamline-sample/openapi-fetch-runtime'
import { currentEnv, getApiEndpoint, getApiKey, type ApiName } from './configs/globals'
import { createMiddleware } from './middleware'
import logger from './logger'

export const getApiConfig = (apiName: ApiName): Configuration => {
  const basePath = getApiEndpoint(apiName)
  const apiKey = getApiKey(apiName)
  
  logger.debug({ 
    apiName, 
    basePath,
    environment: currentEnv,
    hasApiKey: !!apiKey 
  }, 'Creating API configuration')

  return new Configuration({
    basePath,
    headers: {
      'x-api-key': apiKey
    },
    middleware: createMiddleware()
  })
}
