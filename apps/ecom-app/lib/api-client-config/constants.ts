import { Environment } from "./environment"
import { ApiName } from "./globals"

export const DEFAULT_DEV_PORTS = {
  'products-api': 3001,
  'users-api': 3002
} as const

export const API_ENDPOINTS: Record<ApiName, string | undefined> = {
  'products-api': process.env.PRODUCTS_API_ENDPOINT,
  'users-api': process.env.USERS_API_ENDPOINT
}

export const API_KEYS: Record<ApiName, string | undefined> = {
  'products-api': process.env.PRODUCTS_API_KEY,
  'users-api': process.env.USERS_API_KEY
}

export const API_TIMEOUTS: Record<Environment, number> = {
  dev: 30000,
  qa: 15000,
  prod: 10000
} as const
