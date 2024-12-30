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
          expect(res.body.endpoints.users).toBe('/users');
          expect(res.body.endpoints.docs.ui).toBe('/api-docs');
          expect(res.body.endpoints.docs.openapi).toBe('/api-docs-json');
        });
    });
  });

  describe('Users', () => {
    const testUser = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
    };

    it('/users (POST)', () => {
      return request(app.getHttpServer())
        .post('/users')
        .send(testUser)
        .expect(201)
        .expect((res) => {
          expect(res.body.id).toBeDefined();
          expect(res.body.name).toBe(testUser.name);
          expect(res.body.email).toBe(testUser.email);
          expect(res.body.phone).toBe(testUser.phone);
          expect(res.body.createdAt).toBeDefined();
        });
    });

    it('/users (GET)', () => {
      return request(app.getHttpServer())
        .get('/users')
        .expect(200)
        .expect((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          expect(res.body.length).toBeGreaterThan(0);
        });
    });

    it('/users/:id (GET)', () => {
      return request(app.getHttpServer())
        .get('/users/2')
        .expect(200)
        .expect((res) => {
          expect(res.body.id).toBe(2);
          expect(res.body.name).toBe(testUser.name);
          expect(res.body.email).toBe(testUser.email);
        });
    });

    it('/users/:id (GET) - Not Found', () => {
      return request(app.getHttpServer()).get('/users/999').expect(404);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
