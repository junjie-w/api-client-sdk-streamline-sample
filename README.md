# api-client-sdk-streamline-sample

```bash
API Dev  →  OpenAPI Specs  →  SDK Package  →  API Client Configuration  →  API Client Usage
```

A project demonstrating streamlined API client SDK development workflow - from OpenAPI spec generation, to client SDK publishing, configuration, and consumption:) 
                         
## 🚂 Project Structure

> This project uses a monorepo ([Turborepo](https://turbo.build/repo)) for demonstration purpose.

```
root (turbo monorepo)
├── apps/
│   ├── products-api/                      # Product API service (NestJS)
│   ├── users-api/                         # User API service (NestJS)
│   └── ecom-app/                          # Demo web app (Next.js)
│       ├── app/
│       │   └── api/
│       │       ├── products/
│       │       │   ├── route.ts
│       │       │   └── [id]/
│       │       │       └── route.ts
│       │       └── users/
│       │           ├── route.ts
│       │           └── [id]/
│       │               └── route.ts
│       └── lib/
│           └── api-client-config/         # API client configuration
│
├── packages/
│   └── openapi-fetch-runtime/             # Shared fetch runtime for generated SDKs
│
├── .changeset/                            # Changesets for versioning
│   └── config.json
│
├── .github/
│   └── workflows/
│       ├── version-release.yml            # Version & Release NestJS APIs
│       ├── push-spec.yml                  # Push API specs to SwaggerHub
│       ├── publish-sdk.yml                # Generate & Release & Publish SDK packages
│       └── release-base.yml               # Shared release workflow
│           
├── package.json
└── turbo.json                             # Turborepo config
```

## 👀 A Closer Look

### 1. 🏗️ API Development

> 👻 NestJS + Swagger decorators automatically generate clean OpenAPI specs, which will be used later for SDK generation. The `operationId` in decorators maps directly to SDK method names.

Two NestJS services that auto-generate OpenAPI specs using Swagger decorators:

<details>
<summary>API Services Overview</summary>

```bash
apps/
├── products-api/  # Product service (port: 3001)
│   └── endpoints:
│       POST   /products             → createProduct
│       GET    /products             → getAllProducts
│       GET    /products?category=   → getProductsByCategory
│       GET    /products/:id         → getProduct
└── users-api/     # User service (port: 3002)
    └── endpoints:
        POST   /users                → createUser
        GET    /users                → getAllUsers
        GET    /users/:id            → getUser
```

</details>

<details>
<summary>Test Endpoints</summary>

```bash
# 1. Start the Service
cd apps/products-api     # or cd apps/users-api
npm run dev              # products: 3001, users: 3002

# 2. View API Documentation
# Products API: http://localhost:3001/api-docs
# Users API:    http://localhost:3002/api-docs

# 3. Test All Endpoints: Run Test Script with Sample Data
npm run demo             # Executes try-{service}-api.sh
# products-api → try-products-api.sh
# users-api   → try-users-api.sh
```

</details>

### 2. 🏒 Push Specs to SwaggerHub 

> 👻 While this demo uses a centralized workflow for simplicity, each API could have its own independent versioning and publishing process in a microservices setup.

First, APIs are versioned and released with [Changesets](https://github.com/changesets/changesets):

<details>
<summary>Version & Release NestJS APIs</summary>

```bash
.github/workflows/
├── version-release.yml   # Version & Release NestJS APIs
└── release-base.yml      # Shared release workflow
```

</details>

Then, OpenAPI specs are generated and pushed to SwaggerHub:

```bash
.github/workflows/
└── push-spec.yml         # Version & Publish OpenAPI Specs
```

![workflow-title-push-spec](./assets/docs/workflow-title-push-spec.png)
![workflow-detail-push-spec](./assets/docs/workflow-detail-push-sepc.png)

Once published, specs are available on SwaggerHub:
- 📄 [@api-client-sdk-streamline-sample | Products API](https://app.swaggerhub.com/apis/junjie.wu/sample-products-api)
- 📄 [@api-client-sdk-streamline-sample | Users API](https://app.swaggerhub.com/apis/junjie.wu/sample-users-api)

### 3. 🎩 Generate & Publish SDK as NPM packages

> 👻 Instead of keeping generated SDKs in the repo, we generate and publish them directly to NPM.

Based on these [OpenAPI](https://swagger.io/specification/) specifications, TypeScript SDKs are automatically generated (with [`@openapitools/openapi-generator-cli`](https://github.com/OpenAPITools/openapi-generator-cli)) and published as NPM packages:

```bash
.github/workflows/
└── publish-sdk.yml          # Generate & Release & Publish SDK packages

packages/
└── openapi-fetch-runtime/   # Shared fetch runtime for generated SDKs
```

![workflow-title-publish-sdk](./assets/docs/workflow-title-publish-sdk.png)
![workflow-detail-publish-sdk](./assets/docs/workflow-detail-publish-sdk.png)

Published SDK packages:
- 🧳 [@api-client-sdk-streamline-sample/products-api-client](https://www.npmjs.com/package/@api-client-sdk-streamline-sample/products-api-client)
- 🧳 [@api-client-sdk-streamline-sample/users-api-client](https://www.npmjs.com/package/@api-client-sdk-streamline-sample/users-api-client)

<details>
<summary>SDK Generation Process: A Summary</summary>

```bash
1. Pull OpenAPI specs from SwaggerHub
2. Generate TypeScript clients using `openapi-generator-cli`
3. Configure shared runtime package to avoid duplication
4. Update package metadata and documentation
5. Create GitHub release
6. Publish to NPM
```

</details>

### 4. 🎠 API Client Configuration

Now that we have our SDKs published on NPM, let's set up API client configuration in our Next.js app:

```bash
apps/ecom-app/
├── app/
│   └── api/                    # API Routes
└── lib/
    └── api-client-config/      # API client configuration
```

Client Configuration Structure:

```bash
api-client-config/
├── configs/                     # Environment-based configuration
├── middlewares/                 # Request & Response & onError middlewares
├── errors/                      # Error handling & types
├── api-client-cache.ts          # Client instance caching
├── api-client-config.ts         # Base client configuration
├── api-client-factory.ts        # Factory pattern for client creation
└── logger.ts                    # Logging utilities
```

### 5. 🎸 Example usage in Next.js API routes

<details>
<summary>API Routes Structure</summary>

```
apps/ecom-app/
├── app/
│   └── api/
│       ├── products/
│       │   ├── route.ts
│       │   └── [id]/
│       │       └── route.ts
│       └── users/
│           ├── route.ts
│           └── [id]/
│               └── route.ts
└── lib/
    └── api-client-config/
```

</details>

```typescript
import { getProductsApi } from '@/lib/api-client-config/api-client-factory'

export async function GET() {
  try {
    const productsApi = getProductsApi()
    const products = await productsApi.getAllProducts()
    return NextResponse.json(products)
  } catch (error) {
    return handleApiError(error)
  }
}
```

## 🎢 Try It Out

Test the complete workflow:

<details>
<summary>1. Start API Services and Run the Next.js App</summary>

```bash
# Using Turbo (recommended):
npm run dev
```

This starts:
- Next.js app on `http://localhost:3000`
- Products API on `http://localhost:3001`
- Users API on `http://localhost:3002`

Or start services individually:

```bash
# Start Products API
cd apps/products-api
npm run dev

# Start Users API
cd apps/users-api
npm run dev

# Start Next.js App
cd apps/ecom-app
npm run dev
```

</details>

<details>
<summary>2. Test Endpoints</summary>

#### Products API

```bash
# Create a product
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mechanical Keyboard",
    "price": 159.99,
    "description": "Premium mechanical keyboard with RGB lighting",
    "categories": ["electronics", "accessories"]
  }'

# Get all products
curl http://localhost:3000/api/products

# Get products by category
curl 'http://localhost:3000/api/products?category=electronics'

# Get a specific product
curl http://localhost:3000/api/products/1
```

#### Users API

```bash
# Create a user
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Smith",
    "email": "jane@example.com",
    "phone": "111-111-1111"
  }'

# Get all users
curl http://localhost:3000/api/users

# Get a specific user
curl http://localhost:3000/api/users/1
```

</details>

<details>

<summary>🪐 How It Works: A Short Review</summary>

```
1. Request hits the Next.js API routes
2. Routes instantiate configured SDK clients
3. SDK clients make HTTP requests to NestJS services
4. NestJS services process and return the response
5. SDK clients transform the responses
6. Next.js routes return the final JSON response
```

</details>

## 👻 Links

OpenAPI Specs on SwaggerHub:
- 📄 [@api-client-sdk-streamline-sample | Products API](https://app.swaggerhub.com/apis/junjie.wu/sample-products-api)
- 📄 [@api-client-sdk-streamline-sample | Users API](https://app.swaggerhub.com/apis/junjie.wu/sample-users-api)

API Client SDK Packages on NPM:
- 🧳 [@api-client-sdk-streamline-sample/products-api-client](https://www.npmjs.com/package/@api-client-sdk-streamline-sample/products-api-client)
- 🧳 [@api-client-sdk-streamline-sample/users-api-client](https://www.npmjs.com/package/@api-client-sdk-streamline-sample/users-api-client)
