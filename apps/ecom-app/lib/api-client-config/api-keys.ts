import { ApiName } from './globals'

export const getApiKey = (apiName: ApiName): string => {
  const apiKeys = {
    'products-api': process.env.PRODUCTS_API_KEY,
    'users-api': process.env.USERS_API_KEY
  }
  
  const apiKey = apiKeys[apiName]
  if (!apiKey) {
    console.warn(`No API key found for ${apiName}`)
  }
  
  return apiKey || ''
}
