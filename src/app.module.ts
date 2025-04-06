import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from 'users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TasksController } from './tasks/tasks.controller';
import { TasksModule } from './tasks/tasks.module';
import { ArticleService } from './article/article.service';
import { ArticleModule } from './article/article.module';
import { ArticleController } from './article/article.controller';
import { AuthController } from './auth/auth.controller';
import { AdminController } from './admin/admin.controller';
import { AdminModule } from './admin/admin.module';


@Module({
imports: [PrismaModule, UsersModule, AuthModule, ConfigModule.forRoot({ isGlobal: true}), TasksModule, ArticleModule, AdminModule],
  controllers: [AppController, TasksController, ArticleController, AuthController, AdminController],
  providers: [AppService, ArticleService],
})
export class AppModule {}
