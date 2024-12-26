import { Configuration } from '@api-client-sdk-streamline-sample/openapi-fetch-runtime'
import { ProductsApi } from '@api-client-sdk-streamline-sample/products-api-client'
import { UsersApi } from '@api-client-sdk-streamline-sample/users-api-client'
import { API_CONFIG, API_TIMEOUT, type ApiName } from './globals'

const getApiConfig = (apiName: ApiName): Configuration => {
  const basePath = API_CONFIG[apiName]
  console.log(`Creating API client for ${apiName} with basePath: ${basePath}`)
  console.log('API_CONFIG:', API_CONFIG)

  return new Configuration({
    basePath,
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
            statusText: context.response.statusText,
            headers: Object.fromEntries(context.response.headers.entries())
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

export const getProductsApi = () => {
  return new ProductsApi(getApiConfig('products-api'))
}

export const getUsersApi = () => {
  return new UsersApi(getApiConfig('users-api'))
}
