export type Environment = 'dev' | 'qa' | 'prod'

export const getEnvironment = (): Environment => {
  if (process.env.NODE_ENV === 'production') {
    return 'prod'
  }

  if (process.env.NEXT_PUBLIC_APP_ENV === 'qa') {
    return 'qa'
  }

  return 'dev'
}

export const isDev = () => getEnvironment() === 'dev'
export const isQa = () => getEnvironment() === 'qa'
export const isProd = () => getEnvironment() === 'prod'
