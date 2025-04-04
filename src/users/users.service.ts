import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { CreateUserDto } from 'src/dto/create.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService){}

    save(user: CreateUserDto) {
        return this.prismaService.user.create({
            data: {
                ...user,
                roles: ['USER'],
            },
        }); 
    }

    findOne(Login: string) {
        return this.prismaService.user.findFirst({
            where:{
                login : Login,
            },
        });
    }

    delete(id: number) {
        return this.prismaService.user.delete({
            where:{ id }
        })
    }
}

