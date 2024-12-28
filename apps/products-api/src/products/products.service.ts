import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService implements OnModuleInit {
  private products: Product[] = [];

  onModuleInit() {
    this.addDefaultProduct();
  }

  private addDefaultProduct() {
    const defaultProduct: CreateProductDto = {
      name: 'Mechanical Keyboard',
      price: 159.99,
      description: 'Premium mechanical keyboard with RGB lighting',
      categories: ['electronics', 'accessories'],
    };

    this.create(defaultProduct);
  }

  create(createProductDto: CreateProductDto): Product {
    const product = {
      id: this.products.length + 1,
      ...createProductDto,
      createdAt: new Date(),
    };
    this.products.push(product);
    return product;
  }

  findAll(category?: string): Product[] {
    if (category) {
      return this.products.filter((p) => p.categories.includes(category));
    }
    return this.products;
  }

  findOne(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }
}
