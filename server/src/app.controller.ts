import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './database/pisma.service';
import { IsPublic } from './auth/decorators/is-public.decorator';

@IsPublic()
@Controller('app')
export class AppController {
 constructor(
    private readonly appService: AppService,
    private prisma: PrismaService
 ) {}

}
