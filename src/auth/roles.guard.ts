import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
  } from '@nestjs/common';
  import { Reflector } from '@nestjs/core';
  import { Role } from '@prisma/client';
import { ROLES_KEY } from './roles.decorator';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
  
    canActivate(context: ExecutionContext): boolean {
      const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
        context.getHandler(),
        context.getClass(),
      ]);
  
      if (!requiredRoles || requiredRoles.length === 0) {
        return true; // если не указано ограничение по ролям
      }
  
      const request = context.switchToHttp().getRequest();
      const user = request.user;
  
      if (!user || !user.roles) {
        throw new ForbiddenException('Нет доступа');
      }
  
      // Проверка: есть ли у пользователя хотя бы одна требуемая роль
      const hasRole = user.roles.some((role: Role) => requiredRoles.includes(role));
  
      if (!hasRole) {
        throw new ForbiddenException('Недостаточно прав');
      }
  
      return true;
    }
  }
  