import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma, User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@IsPublic()
@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() data: Prisma.UserCreateInput): Promise<User> {
     return this.userService.createUser(data);
  }

  @Get()
  findAll(): Promise<User[]> {
     return this.userService.getUseres();
  }
 
  @Get(':id')
  findOne(@Param('id') id: string): Promise<User | null> {
     return this.userService.getUserById(id);
  }
 
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput): Promise<User> {
     return this.userService.updateUser(id, data);
  }
 
  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
     return this.userService.deleteUser(id);
  }
}
