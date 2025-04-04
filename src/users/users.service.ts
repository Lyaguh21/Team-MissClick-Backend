import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import { genSalt, genSaltSync, hashSync } from 'bcrypt';
import { CreateUserDto } from 'src/dto/create.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService){}

    save(user: CreateUserDto) {
        const hashPassword = this.hashPassword(user.password)
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

    private hashPassword(password: string) {
        return hashSync(password, genSaltSync(10))
    }
}

