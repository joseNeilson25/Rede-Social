import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './database/pisma.service';
import { UserModule } from './user/user.module';
import { MemoriesModule } from './memories/memories.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './files.controller';

@Module({
  imports: [UserModule, MemoriesModule, PrismaModule, AuthModule,
    MulterModule.register({
      dest: './uploads',
    })],
  controllers: [AppController, FileController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PrismaService,
  ],
})
export class AppModule {}
