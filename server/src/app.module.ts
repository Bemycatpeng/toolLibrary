import { Module } from '@nestjs/common';
import { HelloWorldModule } from './modules/helloWorld/helloWorld.module';

@Module({
  imports: [HelloWorldModule],
})
export class AppModule {}
