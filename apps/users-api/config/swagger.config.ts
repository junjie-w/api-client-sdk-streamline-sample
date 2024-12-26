import { DocumentBuilder } from '@nestjs/swagger';
import { version } from '../package.json';

const title = '@api-client-sdk-streamline-sample | Users API';
const description = `Sample Users API for streamlined API client SDK workflow demonstration.
Part of [api-client-sdk-streamline-sample](https://github.com/junjie-w/api-client-sdk-streamline-sample) project.`;

export const swaggerConfig = new DocumentBuilder()
  .setTitle(title)
  .setDescription(description)
  .setVersion(version)
  .build();
