import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloWorldService {
  getHello(): string {
    return 'Hello World! 你好世界！我亲爱的世界';
  }
}
