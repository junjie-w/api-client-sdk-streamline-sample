import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  it('should return API information', () => {
    const result = controller.getApiInfo();
    expect(result.message).toBeDefined();
    expect(result.endpoints).toBeDefined();
    expect(result.endpoints.users).toBe('/users');
  });
});
