// src/config/swagger.config.ts
import { DocumentBuilder } from '@nestjs/swagger';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('User Profile')
  .setDescription('Manage and retrieve user information')
  .setVersion('1.0.0')
  .build();
