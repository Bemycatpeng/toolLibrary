import { Controller, Get } from '@nestjs/common';
import { HelloWorldService } from './helloWorld.service';

@Controller()
export class HelloWorldController {
  constructor(private readonly appService: HelloWorldService) {}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}
