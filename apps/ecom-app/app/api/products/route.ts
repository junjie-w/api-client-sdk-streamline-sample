import { NextResponse } from 'next/server'
import { getProductsApi } from '@/lib/api-client-config'
import logger from '@/lib/api-client-config/logger'

export async function GET() {
  try {
    logger.info('Starting GET request to /api/products')
    const productsApi = getProductsApi()
    const products = await productsApi.productsControllerFindAll()
    logger.debug({ products }, 'Products retrieved successfully')
    return NextResponse.json(products)
  } catch (error: any) {
    logger.error({
      error: {
        name: error?.name,
        message: error?.message,
        cause: error?.cause,
        stack: error?.stack
      }
    }, 'Failed to fetch products')
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error?.message },
      { status: 500 }
    )
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
  } catch (error: any) {
    logger.error({
      error: {
        name: error?.name,
        message: error?.message,
        cause: error?.cause,
        stack: error?.stack
      }
    }, 'Failed to create product')
    return NextResponse.json(
      { error: 'Failed to create product', details: error?.message },
      { status: 500 }
    )
  }
}
