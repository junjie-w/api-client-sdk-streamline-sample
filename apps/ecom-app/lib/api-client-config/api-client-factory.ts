import { Configuration, BaseAPI } from '@api-client-sdk-streamline-sample/openapi-fetch-runtime'
import { ProductsApi } from '@api-client-sdk-streamline-sample/products-api-client'
import { UsersApi } from '@api-client-sdk-streamline-sample/users-api-client'
import { type ApiName } from './configs/globals'
import { addApiClientToCache, getCachedApiClient } from './api-client-cache'
import { getApiConfig } from './api-client-config'

/**
 * Generic function to get or create an API client
 * @example
 * // For ProductsApi:
 * const client = getApiClient<ProductsApi>('products-api', ProductsApi)
 */
const getApiClient = <T extends BaseAPI>(
  apiName: ApiName,
  apiClientClass: new (configuration: Configuration) => T
): T => {
  const cachedClient = getCachedApiClient<T>(apiName, apiClientClass.name)
  if (cachedClient) {
    console.log(`Using cached client for ${apiName}`)
    return cachedClient
  }

  console.log(`Creating new client for ${apiName}`)
  const configuration = getApiConfig(apiName)
  const clientInstance = new apiClientClass(configuration)
  
  addApiClientToCache(apiName, clientInstance)
  
  return clientInstance
}

export const getProductsApi = () => {
  return getApiClient<ProductsApi>('products-api', ProductsApi)
}

export const getUsersApi = () => {
  return getApiClient<UsersApi>('users-api', UsersApi)
}
