import { NextResponse } from 'next/server'
import { ResponseError } from '@api-client-sdk-streamline-sample/openapi-fetch-runtime'
import { NetworkError, TimeoutError } from './types'
import logger from '../logger'

export const handleApiError = async (error: unknown) => {
  if (error instanceof TimeoutError) {
    logger.error('Request timed out')
    return NextResponse.json(
      { error: 'Request timed out' },
      { status: 408 }
    )
  }

  if (error instanceof NetworkError) {
    logger.error('Network error occurred')
    return NextResponse.json(
      { error: 'Network error occurred' },
      { status: 502 }
    )
  }

  if (error instanceof ResponseError) {
    const responseData = await error.response.json().catch(() => null)
    logger.error({ 
      status: error.response.status,
      data: responseData 
    }, 'API error response')
    return NextResponse.json(
      responseData || { error: 'Failed to parse error response as JSON' },
      { status: error.response.status }
    )
  }

  logger.error({ error }, 'Unexpected error occurred')
  return NextResponse.json(
    { error: 'Internal server error' },
    { status: 500 }
  )
}
