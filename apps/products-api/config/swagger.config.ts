import { DocumentBuilder } from '@nestjs/swagger';
import { version } from '../package.json';

const title = '@api-client-sdk-streamline-sample | Products API';
const description = `Sample Products API for streamlined API client SDK workflow demonstration.
Part of [api-client-sdk-streamline-sample](https://github.com/junjie-w/api-client-sdk-streamline-sample) project.`;

export const swaggerConfig = new DocumentBuilder()
  .setTitle(title)
  .setDescription(description)
  .setVersion(version)
  .build();
