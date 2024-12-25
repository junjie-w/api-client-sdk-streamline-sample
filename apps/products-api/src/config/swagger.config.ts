import { DocumentBuilder } from '@nestjs/swagger';

import { version } from '../../package.json';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('@api-client-sdk-streamline-sample | Products API')
  .setDescription(
    'Sample Products API for streamlined API client SDK workflow demonstration.\nPart of [api-client-sdk-streamline-sample](https://github.com/junjie-w/api-client-sdk-streamline-sample) project.',
  )
  .setVersion(version)
  .build();
