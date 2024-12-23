import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Product Catalog')
  .setDescription('Manage and retrieve product information')
  .setVersion('1.0.0')
  .addTag('products')
  // Add security if needed
  // .addBearerAuth()
  .build();
