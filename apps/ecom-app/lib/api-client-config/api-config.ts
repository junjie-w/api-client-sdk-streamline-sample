import { Configuration } from '@api-client-sdk-streamline-sample/openapi-fetch-runtime'
import { API_CONFIG, type ApiName } from './globals'
import { getApiKey } from './api-keys'
import { createMiddleware } from './middleware'
import logger from './logger'

export const getApiConfig = (apiName: ApiName): Configuration => {
  const basePath = API_CONFIG[apiName]
  const apiKey = getApiKey(apiName)
  
  logger.debug({ 
    apiName, 
    basePath,
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
