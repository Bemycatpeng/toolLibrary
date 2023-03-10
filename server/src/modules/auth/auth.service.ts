import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class AuthService {
  private readonly users = [
    {
      userId: 1,
      username: 'admin',
      password: 'admin',
    },
    {
      userId: 2,
      username: 'john',
      password: 'guess',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }

  getHello(): string {
    return 'Hello World! 你好世界！我亲爱的世界';
  }
}
