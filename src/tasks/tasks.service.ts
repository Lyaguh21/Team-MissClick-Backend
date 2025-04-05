import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma/prisma.service';
import { UsersService } from 'users/users.service';

@Injectable()
export class TasksService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly userService: UsersService,
    ){}

    async create(){
        
    }
}
