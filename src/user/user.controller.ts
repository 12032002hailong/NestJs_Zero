import { Controller, Delete, Get } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  findAll(): string {
    return 'Find all users';
  }

  @Get('/by-id')
  findById(): string {
    return 'find user by id';
  }
}
