import { NextRequest, NextResponse } from 'next/server'
import logger from '@/lib/api-client-config/logger'
import { handleApiError } from '@/lib/api-client-config/errors/handler'
import { getUsersApi } from '@/lib/api-client-config/api-client-factory'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id

    logger.info(`Starting GET request to /api/users/${id}`)
    const usersApi = getUsersApi()
    
    const user = await usersApi.getUser({
      id
    })
    
    logger.debug({ user }, 'User retrieved successfully')
    return NextResponse.json(user)
  } catch (error) {
    return handleApiError(error)
  }
}
