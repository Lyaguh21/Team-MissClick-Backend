import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaService } from '@prisma/prisma.service';


@Module({
  controllers: [AdminController],
  providers: [AdminService, PrismaService],
  exports: [AdminService], // если ты будешь использовать его в других модулях
})
export class AdminModule {}