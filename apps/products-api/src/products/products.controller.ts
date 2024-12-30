import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({
    operationId: 'createProduct',
    summary: 'Create a new product',
  })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Product created successfully',
    type: Product,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid product data',
  })
  async create(@Body() body: CreateProductDto) {
    return this.productsService.create(body);
  }

  @Get()
  @ApiOperation({ operationId: 'getAllProducts', summary: 'Get all products' })
  @ApiQuery({ name: 'category', required: false })
  @ApiResponse({
    status: 200,
    description: 'List of products',
    type: [Product],
  })
  async findAll(@Query('category') category?: string) {
    const products = await this.productsService.findAll(category);
    if (!products.length) {
      throw new NotFoundException('No products found');
    }
    return products;
  }

  @Get(':id')
  @ApiOperation({ operationId: 'getProduct', summary: 'Get product by ID' })
  @ApiResponse({
    status: 200,
    description: 'Product found',
    type: Product,
  })
  @ApiResponse({
    status: 404,
    description: 'Product not found',
  })
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(+id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }
}
