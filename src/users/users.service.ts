import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { use } from 'passport';
import { registerDto } from 'src/auth/dto/register.dto';
import { FindAllDto } from './dto/findAll.dto';

@Injectable()
export class UsersService {
  jwtService: any;
  prisma: any;
  constructor(private readonly prismaService: PrismaService) {}

  async save(user: registerDto) {
    const existingUser = await this.prismaService.user.findUnique({
      where: { login: user.login },
    });

    if (existingUser) {
      throw new ConflictException(
        'Пользователь с таким логином уже существует',
      );
    }

    const hashPassword = await this.hashPassword(user.password);

    return this.prismaService.user.create({
      data: {
        login: user.login,
        password: hashPassword,
        name: user.name,
        roles: ['USER'],
      },
    });
  }

  findOne(Login: string) {
    return this.prismaService.user.findFirst({
      where: {
        login: Login,
      },
    });
  }

  async findAll() {
    const users = await this.prismaService.user.findMany({
      where: {
        deleted: false,
      },
      orderBy: {
        id: 'asc',
      },
    });
    return users.map((users) => ({
      id: users.id,
      login: users.login,
      name: users.name,
      role: users.roles,
      createdAt: users.createdAt,
    }));
  }

  delete(id: number) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }

  private async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async validatePassword(password: string, hash: string) {
    return bcrypt.compare(password, hash);
  }

  async getUserFromToken(token: string) {
    try {
      const payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });

      const user = await this.prisma.user.findUnique({
        where: { id: payload.id },
        select: {
          id: true,
          login: true,
          name: true,
          roles: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('Пользователь не найден');
      }

      return user;
    } catch (err) {
      throw new UnauthorizedException('Невалидный токен');
    }
}}
