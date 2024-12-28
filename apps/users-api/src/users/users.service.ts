import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService implements OnModuleInit {
  private users: User[] = [];

  onModuleInit() {
    this.addDefaultUser();
  }

  private addDefaultUser() {
    const defaultUser: CreateUserDto = {
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '111-111-1111',
    };
    this.create(defaultUser);
  }

  create(createUserDto: CreateUserDto): User {
    const user = {
      id: this.users.length + 1,
      ...createUserDto,
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }
}
