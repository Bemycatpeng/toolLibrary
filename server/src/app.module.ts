import { Module } from '@nestjs/common';
import { HelloWorldModule } from './modules/helloWorld/helloWorld.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [HelloWorldModule, AuthModule, UsersModule],
})
export class AppModule {}
