import { DocumentBuilder } from '@nestjs/swagger';
import { version } from '../../package.json';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('@api-client-sdk-streamline-sample | Users API')
  .setDescription(
    'Sample Users API for API client SDK workflow demonstration. Part of [api-client-sdk-streamline-sample](https://github.com/junjie-w/api-client-sdk-streamline-sample) project.',
  )
  .setVersion(version)
  .build();
