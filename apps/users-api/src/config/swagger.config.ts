import { DocumentBuilder } from '@nestjs/swagger';
import { version } from '../../package.json';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Sample Users API')
  .setDescription('Sample Users API for API client SDK workflow demonstration. Part of api-client-sdk-workflow-sample project, showcasing API to SDK pipeline.')
  .setVersion(version)
  .build();
