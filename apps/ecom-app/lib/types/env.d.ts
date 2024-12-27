declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      NEXT_PUBLIC_APP_ENV?: 'qa'
      API_URL?: string
      PRODUCTS_API_KEY?: string
      USERS_API_KEY?: string
    }
  }
}

export {}
