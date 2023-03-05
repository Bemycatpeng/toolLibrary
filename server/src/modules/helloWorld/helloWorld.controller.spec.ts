import { Test, TestingModule } from '@nestjs/testing';
import { HelloWorldController } from './helloWorld.controller';
import { HelloWorldService } from './helloWorld.service';

describe('AppController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [HelloWorldController],
      providers: [HelloWorldService],
    }).compile();
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      const appController = app.get(HelloWorldController);
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
