# API Client SDK Streamline Sample

A demonstration of streamlined API client SDK development, from API specification to client usage.

## Project Flow

1. API Development
2. Push Spec to SwaggerHub
3. Publish SDK to NPM
4. Use API Client Config in API Routes

## Project Structure

- Root
  - apps
    - ecom-app
      - api (Route Handlers)
      - lib (API Client Config)
    - products-api
    - users-api
  - packages
    - openapi-fetch-runtime
  - workflows (GitHub Actions)

## Features

- 🔄 Automated API spec publishing
- 📦 Streamlined SDK generation
- 🛠 Centralized client configuration
- 🌟 Type-safe API interactions

## How It Works

### 1. API Development
- NestJS APIs with OpenAPI decorators
- Automated spec generation
- GitHub Actions workflow for spec publishing

### 2. SDK Generation
- OpenAPI Generator with customized templates
- Automated NPM package publishing
- Runtime package for shared utilities

### 3. Client Configuration
- Environment-based configuration 
- Error handling and logging
- Client instance caching
- Request middleware

### 4. API Routes
- Type-safe API client usage
- Proxy route implementations
- Error handling and response mapping

## Usage

1. Push API Spec:
```bash
# Triggered via GitHub Actions
- GitHub workflow publishes spec
```

2. Generate SDK:
```bash
# Automated via GitHub Actions
- Pull spec from SwaggerHub
- Generate TypeScript client
- Publish to NPM
```

3. Use in Routes:
```typescript
import { getProductsApi } from '@/lib/api-client-config'

export async function GET() {
  const productsApi = getProductsApi()
  const products = await productsApi.findAll()
  return NextResponse.json(products)
}
```

## Links

- [Products API Spec](https://app.swaggerhub.com/apis/junjie.wu/sample-products-api)
- [Users API Spec](https://app.swaggerhub.com/apis/junjie.wu/sample-users-api)
- [Products SDK Package](https://www.npmjs.com/package/@api-client-sdk-streamline-sample/products-api-client)
- [Users SDK Package](https://www.npmjs.com/package/@api-client-sdk-streamline-sample/users-api-client)

## Development

```bash
# Install dependencies
npm install

# Start development servers
npm dev

# Run tests
npm test

# Build all packages
npm build
```

## Notes

While demonstrated in a monorepo, in a real-world scenario, each API might be a separate microservice, rather than being part of a monorepo. In this case, the following aspects of the demonstrated workflow would still be applicable:

- SDK Distribution: The `publish-sdk.yml` workflow can be used to distribute the generated SDKs via NPM, making them accessible to client applications.
- Reusable Client Configuration: The `api-client-config` approach can be adopted to provide a reusable client configuration, simplifying the integration process for client applications.
