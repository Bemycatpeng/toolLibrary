import { Controller, Get, Query } from '@nestjs/common';
import { User, UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUserName(
    @Query('userName') userName: string,
  ): Promise<User | undefined> {
    return await this.usersService.findOne(userName);
  }
}
