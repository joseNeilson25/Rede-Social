import { PartialType } from '@nestjs/mapped-types';
import { CreateMemoryDto } from './create-memory.dto';
import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
export class UpdateMemoryDto extends PartialType(CreateMemoryDto) {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  coverUrl: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  isPublic: boolean;
  
  @IsString()
  @IsNotEmpty()
  createdAt: string;
}
