import { Environment } from "./environment"

export const DEFAULT_DEV_PORTS = {
  'products-api': 3001,
  'users-api': 3002
} as const

export const API_TIMEOUTS: Record<Environment, number> = {
  dev: 30000,
  qa: 15000,
  prod: 10000
} as const
