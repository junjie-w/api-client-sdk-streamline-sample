import { NextResponse } from 'next/server'
import { getUsersApi } from '@/lib/api-client-config/api'

export async function GET() {
  try {
    console.log('Starting GET request to /api/users')
    const usersApi = getUsersApi()
    const users = await usersApi.usersControllerFindAll()
    console.log('Users retrieved:', users)
    return NextResponse.json(users)
  } catch (error: any) {
    console.error('Failed to fetch users:', {
      name: error?.name,
      message: error?.message,
      cause: error?.cause,
      stack: error?.stack
    })
    return NextResponse.json(
      { error: 'Failed to fetch users', details: error?.message },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    console.log('Starting POST request to /api/users')
    const usersApi = getUsersApi()
    const newUser = await usersApi.usersControllerCreate({
      createUserDto: {
        name: "Sample User",
        email: "sample@example.com",
        phone: "000-000-0000"
      }
    })
    console.log('User created:', newUser)
    return NextResponse.json(newUser)
  } catch (error: any) {
    console.error('Failed to create user:', {
      name: error?.name,
      message: error?.message,
      cause: error?.cause,
      stack: error?.stack
    })
    return NextResponse.json(
      { error: 'Failed to create user', details: error?.message },
      { status: 500 }
    )
  }
}
