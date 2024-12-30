import { NextRequest, NextResponse } from 'next/server'
import logger from '@/lib/api-client-config/logger'
import { handleApiError } from '@/lib/api-client-config/errors/handler'
import { getProductsApi } from '@/lib/api-client-config/api-client-factory'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id

    logger.info(`Starting GET request to /api/products/${id}`)
    const productsApi = getProductsApi()
    
    const product = await productsApi.getProduct({
      id
    })
    
    logger.debug({ product }, 'Product retrieved successfully')
    return NextResponse.json(product)
  } catch (error) {
    return handleApiError(error)
  }
}
