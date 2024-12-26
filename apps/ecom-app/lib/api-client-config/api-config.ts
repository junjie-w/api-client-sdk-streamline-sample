import { Configuration } from '@api-client-sdk-streamline-sample/openapi-fetch-runtime'
import { API_CONFIG, API_TIMEOUT, type ApiName } from './globals'
import { getApiKey } from './api-keys'
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
    middleware: [
      {
        pre: async (context) => {
          context.init.signal = AbortSignal.timeout(API_TIMEOUT)
          const headers = new Headers(context.init.headers)
          const hasApiKey = headers.has('x-api-key')
          logger.debug({
            url: context.url,
            method: context.init.method,
            hasApiKey
          }, 'Outgoing request')
          return Promise.resolve()
        },
        post: async (context) => {
          if (context.response.ok) {
            logger.debug({
              url: context.url,
              status: context.response.status,
              statusText: context.response.statusText
            }, 'Response received successfully')
          } else {
            const text = await context.response.text()
            logger.error({
              url: context.url,
              status: context.response.status,
              statusText: context.response.statusText,
              error: text
            }, 'Error response received')
          }
          
          return context.response
        }
      }
    ]
  })
}
