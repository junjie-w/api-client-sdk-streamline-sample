import { ResponseContext, ResponseError } from '@api-client-sdk-streamline-sample/openapi-fetch-runtime'
import { TimeoutError, NetworkError } from '../errors/types'
import logger from '../logger'

export const responseMiddleware = async (context: ResponseContext) => {
  try {
    if (!context.response.ok) {
      throw new ResponseError(context.response)
    }

    logger.debug({
      url: context.url,
      status: context.response.status,
      statusText: context.response.statusText
    }, 'Response received successfully')
    
    return context.response
  } catch (error) {
    if (error instanceof ResponseError) {
      throw error
    }

    if (TimeoutError.isTimeout(error)) {
      throw new TimeoutError(undefined, error as Error)
    }

    throw new NetworkError(undefined, error as Error)
  }
}
