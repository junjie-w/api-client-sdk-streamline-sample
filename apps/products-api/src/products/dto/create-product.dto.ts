import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsArray, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Gaming Laptop XPS 15' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1299.99 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: ['electronics', 'laptops'] })
  @IsArray()
  @IsString({ each: true })
  categories: string[];

  @ApiProperty({ required: false, example: 'High-performance gaming laptop' })
  @IsOptional()
  @IsString()
  description?: string;
}
