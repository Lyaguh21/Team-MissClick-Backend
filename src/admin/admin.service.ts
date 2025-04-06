import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  // Получение всех пользователей с фильтрацией
  async findAll(filters: any) {
    const where: any = {
      deleted: false,
    };

    if (filters.login) where.login = { contains: filters.login };
    if (filters.name) where.name = { contains: filters.name };
    if (filters.roles) where.roles = { has: filters.roles }; // фильтр по роли
    if (filters.createdAt) where.createdAt = new Date(filters.createdAt);

    return this.prisma.user.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async update(id: number, dto: Partial<{ login: string; name: string; roles: string[] }>) {
    const { roles, ...rest } = dto;
  
    const data: any = { ...rest };
  
    if (roles) {
      
      data.roles = {
        set: roles.map((r) => r.toUpperCase() as Role),
      };
    }
  
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async softDelete(id: number) {
    return this.prisma.user.update({
      where: { id },
      data: { deleted: true },
    });
  }

  // Смена пароля
  async changePassword(id: number, newPassword: string) {
    const hash = await bcrypt.hash(newPassword, 10);
    return this.prisma.user.update({
      where: { id },
      data: { password: hash },
    });
  }

  // Назначение ролей (массив)

  async assignRoles(id: number, roles: string[]) {
    // Преобразуем строки в enum значения
    const parsedRoles = roles.map((role) => role.toUpperCase() as Role);

    return this.prisma.user.update({
      where: { id },
      data: {
        roles: {
          set: parsedRoles, // <-- правильный способ обновить массив enum в Prisma
        },
      },
    });
  }
}
