import { Injectable, UseGuards } from '@nestjs/common';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { PrismaService } from 'src/database/pisma.service';
import { Prisma } from '@prisma/client';
import { Memory } from './entities/memory.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
@IsPublic()
@UseGuards(JwtAuthGuard)
@Injectable()
export class MemoriesService {
  constructor(private prisma: PrismaService) {}

  async createMemory(data: Prisma.MemoryCreateInput): Promise<Memory> {
    return this.prisma.memory.create({
      data,
    });
  }

  async getMemoryes(): Promise<Memory[]> {
    return this.prisma.memory.findMany();
  }

  async getMemoryById(id: string): Promise<Memory | null> {
    return this.prisma.memory.findUnique({
      where: { id },
    });
  }

  async getMemoryPublic(): Promise<Memory[]> {
    return this.prisma.memory.findMany({
      where: { isPublic: true },
    });
  }

  async getMemoryByUser(userId: string): Promise<Memory[]> {
    return this.prisma.memory.findMany({
      where: { userId },
    });
  }

  async updateMemory(
    id: string,
    data: Prisma.MemoryUpdateInput,
  ): Promise<Memory> {
    return this.prisma.memory.update({
      where: { id },
      data,
    });
  }

  async deleteMemory(id: string): Promise<Memory> {
    return this.prisma.memory.delete({
      where: { id },
    });
  }
}
