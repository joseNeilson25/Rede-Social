import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { MemoriesService } from './memories.service';
import { CreateMemoryDto } from './dto/create-memory.dto';
import { UpdateMemoryDto } from './dto/update-memory.dto';
import { Memory } from './entities/memory.entity';
import { Prisma } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('memories')
@Controller('memories')
export class MemoriesController {
  constructor(private readonly memoriesService: MemoriesService) {}

  @Post()
  create(@Body() data: Prisma.MemoryCreateInput): Promise<Memory> {
     return this.memoriesService.createMemory(data);
  }
 
  @Get()
  findAll(): Promise<Memory[]> {
     return this.memoriesService.getMemoryes();
  }

  @Get('user-memories/:userId')
  getMemoriesByUser(@Param('userId') userId: string): Promise<Memory[]> {
   return this.memoriesService.getMemoryByUser(userId);
  }

  @Get('public-memories')
  getMemoriesPublic(): Promise<Memory[]> {
   return this.memoriesService.getMemoryPublic();
  }
 
  @Get(':id')
  getMemoryById(@Param('id') id: string): Promise<Memory | null> {
     return this.memoriesService.getMemoryById(id);
  }
 
  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.MemoryUpdateInput): Promise<Memory> {
     return this.memoriesService.updateMemory(id, data);
  }
 
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Memory> {
     return this.memoriesService.deleteMemory(id);
  }
}
