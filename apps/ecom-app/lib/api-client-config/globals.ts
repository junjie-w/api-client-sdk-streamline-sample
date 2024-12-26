export const API_SERVICES = {
  PRODUCTS_API: process.env.NEXT_PUBLIC_PRODUCTS_API_URL || 'http://localhost:3001',
  USERS_API: process.env.NEXT_PUBLIC_USERS_API_URL || 'http://localhost:3002'
} as const

export const API_TIMEOUT = 15000

export type ApiName = 'products-api' | 'users-api'

export const API_CONFIG: Record<ApiName, string> = {
  'products-api': API_SERVICES.PRODUCTS_API,
  'users-api': API_SERVICES.USERS_API
}
