import { NextResponse } from 'next/server'
import { getUsersApi } from '@/lib/api-client-config'
import logger from '@/lib/api-client-config/logger'

export async function GET() {
  try {
    logger.info('Starting GET request to /api/users')
    const usersApi = getUsersApi()
    const users = await usersApi.usersControllerFindAll()
    logger.debug({ users }, 'Users retrieved successfully')
    return NextResponse.json(users)
  } catch (error: any) {
    logger.error({
      error: {
        name: error?.name,
        message: error?.message,
        cause: error?.cause,
        stack: error?.stack
      }
    }, 'Failed to fetch users')
    return NextResponse.json(
      { error: 'Failed to fetch users', details: error?.message },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    logger.info('Starting POST request to /api/users')
    const usersApi = getUsersApi()
    const newUser = await usersApi.usersControllerCreate({
      createUserDto: {
        name: "Sample User",
        email: "sample@example.com",
        phone: "000-000-0000"
      }
    })
    logger.debug({ newUser }, 'User created successfully')
    return NextResponse.json(newUser)
  } catch (error: any) {
    logger.error({
      error: {
        name: error?.name,
        message: error?.message,
        cause: error?.cause,
        stack: error?.stack
      }
    }, 'Failed to create user')
    return NextResponse.json(
      { error: 'Failed to create user', details: error?.message },
      { status: 500 }
    )
  }
}
