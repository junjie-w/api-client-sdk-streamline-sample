import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getApiInfo() {
    return {
      message: 'Welcome to Products API',
      documentation: '/api-docs',
      endpoints: {
        products: '/products',
        docs: {
          ui: '/api-docs',
          openapi: '/api-docs-json',
        },
      },
    };
  }
}
