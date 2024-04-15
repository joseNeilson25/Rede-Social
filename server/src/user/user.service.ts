import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/pisma.service';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const userDataWithHashedPassword = {
      ...data,
      password: hashedPassword,
    };
    return this.prisma.user.create({
      data: userDataWithHashedPassword,
    });
 }
 
  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
  
  // async createUser(createUserDto: CreateUserDto): Promise<User> {
  //   const data: Prisma.UserCreateInput = {
  //     ...createUserDto,
  //     password: await bcrypt.hash(createUserDto.password, 10),
  //   };

  //   const createdUser = await this.prisma.user.create({ data });

  //   return {
  //     ...createdUser,
  //     password: undefined,
  //   };
  // }
  
  async getUseres(): Promise<User[]> {
     return this.prisma.user.findMany();
  }
 
  async getUserById(id: string): Promise<User | null> {
     return this.prisma.user.findUnique({
       where: { id },
     });
  }
 
  async updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User> {
     return this.prisma.user.update({
       where: { id },
       data,
     });
  }
 
  async deleteUser(id: string): Promise<User> {
     return this.prisma.user.delete({
       where: { id },
     });
  }
}
