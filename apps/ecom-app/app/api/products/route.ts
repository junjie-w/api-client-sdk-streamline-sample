import { NextResponse } from 'next/server'
import logger from '@/lib/api-client-config/logger'
import { handleApiError } from '@/lib/api-client-config/errors/handler'
import { getProductsApi } from '@/lib/api-client-config/api-factory'

export async function GET() {
  try {
    logger.info('Starting GET request to /api/products')
    const productsApi = getProductsApi()
    const products = await productsApi.productsControllerFindAll()
    logger.debug({ products }, 'Products retrieved successfully')
    return NextResponse.json(products)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST() {
  try {
    logger.info('Starting POST request to /api/products')
    const productsApi = getProductsApi()
    const newProduct = await productsApi.productsControllerCreate({
      createProductDto: {
        name: "Sample Product",
        price: 29.99,
        description: "A test product",
        categories: ["test"]
      }
    })
    logger.debug({ newProduct }, 'Product created successfully')
    return NextResponse.json(newProduct)
  } catch (error) {
    return handleApiError(error)
  }
}
