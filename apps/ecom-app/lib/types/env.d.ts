declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      NEXT_PUBLIC_APP_ENV?: 'qa'
      PRODUCTS_API_ENDPOINT?: string
      USERS_API_ENDPOINT?: string
      PRODUCTS_API_KEY?: string
      USERS_API_KEY?: string
    }
  }
}

export {}
