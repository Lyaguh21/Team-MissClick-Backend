import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

import { Role } from '@prisma/client';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Roles(Role.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/find')
  getAllUsers(@Body() filters: any) {
    return this.adminService.findAll(filters);
  }

  @Post('/update')
  updateUser(
    @Body()
    body: {
      id: number;
      login?: string;
      name?: string;
      roles?: string[];
    },
  ) {
    const { id, ...dto } = body;
    return this.adminService.update(id, dto);
  }

  
  @Post('/delete')
  deleteUser(@Body() body: { id: number }) {
    return this.adminService.softDelete(body.id);
  }

  @Post('/change-password')
  changePassword(@Body() body: { id: number; newPassword: string }) {
    return this.adminService.changePassword(body.id, body.newPassword);
  }

  // Назначение ролей
  @Post('/set-roles')
  assignRoles(@Body() body: { id: number; roles: string[] }) {
    return this.adminService.assignRoles(body.id, body.roles);
  }
}
