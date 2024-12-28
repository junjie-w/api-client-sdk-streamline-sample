import { DocumentBuilder } from '@nestjs/swagger';
import { version } from '../package.json';

const title = '@api-client-sdk-streamline-sample | Users API';
const description = `Part of [api-client-sdk-streamline-sample](https://github.com/junjie-w/api-client-sdk-streamline-sample), a project demonstrating streamlined API client SDK development workflow.\n
Client SDK available as NPM package: [@api-client-sdk-streamline-sample/users-api-client](https://www.npmjs.com/package/@api-client-sdk-streamline-sample/users-api-client)`;

export const swaggerConfig = new DocumentBuilder()
  .setTitle(title)
  .setDescription(description)
  .setVersion(version)
  .build();
