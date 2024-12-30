import { NextRequest, NextResponse } from 'next/server'
import logger from '@/lib/api-client-config/logger'
import { handleApiError } from '@/lib/api-client-config/errors/handler'
import { getUsersApi } from '@/lib/api-client-config/api-client-factory'

export async function GET() {
  try {
    logger.info('Starting GET request to /api/users')
    const usersApi = getUsersApi()
    
    const users = await usersApi.getAllUsers()
    
    logger.debug({ users }, 'Users retrieved successfully')
    return NextResponse.json(users)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    logger.info('Starting POST request to /api/users')
    const usersApi = getUsersApi()
    
    const body = await request.json()
    const newUser = await usersApi.createUser({
        createUserDto: body
    })
    
    logger.debug({ newUser }, 'User created successfully')
    return NextResponse.json(newUser)
  } catch (error) {
    return handleApiError(error)
  }
}
