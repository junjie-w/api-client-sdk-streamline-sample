export class TimeoutError extends Error {
  override name = 'TimeoutError'
  constructor(
    message: string = 'Request timed out',
    public cause?: Error
  ) {
    super(message)
    if (cause) {
      this.stack = cause.stack
    }
  }

  static isTimeout(error: unknown): boolean {
    return (
      error instanceof DOMException && error.name === 'TimeoutError' ||
      error instanceof TypeError && error.name === 'TypeError' && error.message.includes('The operation was aborted')
    )
  }
}

export class NetworkError extends Error {
  override name = 'NetworkError'
  constructor(
    message: string = 'Network error occurred',
    public cause?: Error
  ) {
    super(message)
    if (cause) {
      this.stack = cause.stack
    }
  }
}
