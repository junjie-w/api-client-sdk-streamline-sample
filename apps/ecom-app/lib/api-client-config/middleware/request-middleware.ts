import { RequestContext } from '@api-client-sdk-streamline-sample/openapi-fetch-runtime'
import { NetworkError } from '../errors/classes'
import { API_TIMEOUT } from '../configs/globals'
import logger from '../logger'

export const requestMiddleware = async (context: RequestContext) => {
  try {
    context.init.signal = AbortSignal.timeout(API_TIMEOUT)
    
    const headers = new Headers(context.init.headers)
    const hasApiKey = headers.has('x-api-key')
    
    logger.debug({
      url: context.url,
      method: context.init.method,
      hasApiKey
    }, 'Outgoing request')

    return Promise.resolve()
  } catch (error) {
    throw new NetworkError('Failed to prepare request', error as Error)
  }
}
