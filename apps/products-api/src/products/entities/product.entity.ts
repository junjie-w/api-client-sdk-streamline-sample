import { ApiProperty } from '@nestjs/swagger';

export class Product {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Gaming Laptop XPS 15' })
  name: string;

  @ApiProperty({ example: 1299.99 })
  price: number;

  @ApiProperty({ example: ['electronics', 'laptops'] })
  categories: string[];

  @ApiProperty({ required: false, example: 'High-performance gaming laptop' })
  description?: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;
}
