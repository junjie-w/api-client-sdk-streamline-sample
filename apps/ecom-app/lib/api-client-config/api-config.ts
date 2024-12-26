import { Configuration } from '@api-client-sdk-streamline-sample/openapi-fetch-runtime'
import { API_CONFIG, API_TIMEOUT, type ApiName } from './globals'
import { getApiKey } from './api-keys'

export const getApiConfig = (apiName: ApiName): Configuration => {
  const basePath = API_CONFIG[apiName]
  const apiKey = getApiKey(apiName)

  console.log(`Creating API client for ${apiName} with basePath: ${basePath}`)
  
  return new Configuration({
    basePath,
    headers: {
      'x-api-key': apiKey
    },
    middleware: [
      {
        pre: async (context) => {
          context.init.signal = AbortSignal.timeout(API_TIMEOUT)
          console.log('Outgoing request:', {
            url: context.url,
            method: context.init.method,
            headers: context.init.headers
          })
          return Promise.resolve()
        },
        post: async (context) => {
          console.log('Response received:', {
            status: context.response.status,
            statusText: context.response.statusText
          })
          
          if (!context.response.ok) {
            const text = await context.response.text()
            console.error('Error response body:', text)
          }
          
          return context.response
        }
      }
    ]
  })
}
