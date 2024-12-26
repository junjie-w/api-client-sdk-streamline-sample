import { getProductsApi } from '@/lib/api-client-config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('Starting GET request to /api/products')
    const productsApi = getProductsApi()
    const products = await productsApi.productsControllerFindAll()
    console.log('Products retrieved:', products)
    return NextResponse.json(products)
  } catch (error: any) {
    console.error('Failed to fetch products:', {
      name: error?.name,
      message: error?.message,
      cause: error?.cause,
      stack: error?.stack
    })
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error?.message },
      { status: 500 }
    )
  }
}

export async function POST() {
  try {
    console.log('Starting POST request to /api/products')
    const productsApi = getProductsApi()
    const newProduct = await productsApi.productsControllerCreate({
      createProductDto: {
        name: "Sample Product",
        price: 29.99,
        description: "A test product",
        categories: ["test"]
      }
    })
    console.log('Product created:', newProduct)
    return NextResponse.json(newProduct)
  } catch (error: any) {
    console.error('Failed to create product:', {
      name: error?.name,
      message: error?.message,
      cause: error?.cause,
      stack: error?.stack
    })
    return NextResponse.json(
      { error: 'Failed to create product', details: error?.message },
      { status: 500 }
    )
  }
}
