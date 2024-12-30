import { NextRequest, NextResponse } from 'next/server'
import logger from '@/lib/api-client-config/logger'
import { handleApiError } from '@/lib/api-client-config/errors/handler'
import { getProductsApi } from '@/lib/api-client-config/api-client-factory'

export async function GET(request: NextRequest) {
  try {
    logger.info('Starting GET request to /api/products')
    const productsApi = getProductsApi()
    
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')

    const products = await productsApi.getAllProducts({
      category: category || undefined
    })
    
    logger.debug({ products }, 'Products retrieved successfully')
    return NextResponse.json(products)
  } catch (error) {
    return handleApiError(error)
  }
}

export async function POST(request: NextRequest) {
  try {
    logger.info('Starting POST request to /api/products')
    const productsApi = getProductsApi()
    
    const body = await request.json()
    const newProduct = await productsApi.createProduct({
        createProductDto: body
    })
    
    logger.debug({ newProduct }, 'Product created successfully')
    return NextResponse.json(newProduct)
  } catch (error) {
    return handleApiError(error)
  }
}
