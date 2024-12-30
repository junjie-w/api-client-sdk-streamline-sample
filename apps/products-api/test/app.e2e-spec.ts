import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('API endpoints (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    );

    await app.init();
  });

  describe('Root Endpoint', () => {
    it('/ (GET)', () => {
      return request(app.getHttpServer())
        .get('/')
        .expect(200)
        .expect((res) => {
          expect(res.body.message).toBeDefined();
          expect(res.body.endpoints.products).toBe('/products');
          expect(res.body.endpoints.docs.ui).toBe('/api-docs');
          expect(res.body.endpoints.docs.openapi).toBe('/api-docs-json');
        });
    });
  });

  describe('Products', () => {
    const testProduct = {
      name: 'Test Product',
      price: 99.99,
      categories: ['test'],
    };

    it('/products (POST)', () => {
      return request(app.getHttpServer())
        .post('/products')
        .send(testProduct)
        .expect(201)
        .expect((res) => {
          expect(res.body.id).toBeDefined();
          expect(res.body.name).toBe(testProduct.name);
          expect(res.body.categories).toEqual(testProduct.categories);
        });
    });

    it('/products (GET)', () => {
      return request(app.getHttpServer())
        .get('/products')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
