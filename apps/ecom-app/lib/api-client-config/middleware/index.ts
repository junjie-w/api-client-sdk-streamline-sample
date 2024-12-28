import { requestMiddleware } from './request-middleware'
import { responseMiddleware } from './response-middleware'
import { onErrorMiddleware } from './onError-middleware'

export const createMiddleware = () => [{
  pre: requestMiddleware,
  post: responseMiddleware,
  onError: onErrorMiddleware
}]
