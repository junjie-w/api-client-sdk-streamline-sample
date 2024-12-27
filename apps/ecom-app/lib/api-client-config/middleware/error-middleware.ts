import { ErrorContext } from "@api-client-sdk-streamline-sample/openapi-fetch-runtime"
import logger from "../logger"

export const errorMiddleware = async (context: ErrorContext) => {
  logger.error({
    url: context.url,
    error: context.error instanceof Error ? {
      name: context.error.name,
      message: context.error.message,
      stack: context.error.stack
    } : context.error
  }, 'Request failed')
  
  throw context.error
}
