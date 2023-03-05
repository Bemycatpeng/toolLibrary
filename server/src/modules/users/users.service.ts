import { Injectable } from '@nestjs/common';

export type User = any;

@Injectable()
export class UsersService {
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
    const name = this.users.find((user) => user.username === username);

    if (!username) {
      return { code: 0, msg: '获取用户信息失败', data: null };
    }

    return { code: 1, msg: '获取用户信息成功', data: name };
  }
}
