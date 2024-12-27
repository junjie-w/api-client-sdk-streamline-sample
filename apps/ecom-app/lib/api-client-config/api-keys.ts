import { API_KEYS } from './constants'
import { ApiName } from './globals'
import logger from './logger'

export const getApiKey = (apiName: ApiName): string => {
  const apiKey = API_KEYS[apiName]
  if (!apiKey) {
    logger.warn({ apiName }, 'No API key configured')
  }
  return apiKey || ''
}
