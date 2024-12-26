import { BaseAPI } from '@api-client-sdk-streamline-sample/openapi-fetch-runtime'
import { ApiName } from './globals'

let cachedApiClients: Record<string, BaseAPI> = {}

/**
 * Generate a unique cache key for an API client
 * @example
 * // Returns "products-api-ProductsApi"
 * getCacheKey('products-api', 'ProductsApi')
 */
export const getCacheKey = (apiName: ApiName, apiClientName: string) => 
  `${apiName}-${apiClientName}`

/**
 * Add an API client instance to cache
 * @example
 * // For ProductsApi instance:
 * // - apiName would be 'products-api'
 * // - apiClientInstance.constructor.name would be 'ProductsApi'
 */
export const addApiClientToCache = (
  apiName: ApiName,
  apiClientInstance: BaseAPI
) => {
  const apiClientName = apiClientInstance.constructor.name
  const cacheKey = getCacheKey(apiName, apiClientName)
  
  cachedApiClients = { ...cachedApiClients, [cacheKey]: apiClientInstance }
}

/**
 * Get a cached API client if it exists
 * @example
 * // For ProductsApi:
 * const client = getCachedApiClient<ProductsApi>('products-api', 'ProductsApi')
 */
export const getCachedApiClient = <T extends BaseAPI>(
  apiName: ApiName,
  apiClientName: string
): T | undefined => {
  const cacheKey = getCacheKey(apiName, apiClientName)
  return cachedApiClients[cacheKey] as T | undefined
}

export const clearApiClientCache = () => {
  cachedApiClients = {}
}
