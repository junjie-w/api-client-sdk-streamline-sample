import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo() {
    return {
      message: 'Welcome to Users API',
      documentation: '/api-docs',
      endpoints: {
        users: '/users',
        docs: {
          ui: '/api-docs',
          openapi: '/api-docs-json',
        },
      },
    };
  }
}
