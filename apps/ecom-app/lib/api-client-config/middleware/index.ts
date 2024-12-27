import { requestMiddleware } from './request-middleware'
import { responseMiddleware } from './response-middleware'
import { errorMiddleware } from './error-middleware'

export const createMiddleware = () => [{
  pre: requestMiddleware,
  post: responseMiddleware,
  onError: errorMiddleware
}]
