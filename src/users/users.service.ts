import { ConflictException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '@prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { registerDto } from 'src/auth/dto/register.dto';

@Injectable()
export class UsersService {
    constructor(private readonly prismaService: PrismaService){}

    async save(user: registerDto) {
        const existingUser = await this.prismaService.user.findUnique({
            where: { login: user.login },
        });
    
        if (existingUser) {
            throw new ConflictException('Пользователь с таким логином уже существует');
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
            where:{
                login : Login,
            },
        });
    }

    async findAll(){
        const users = await this.prismaService.user.findMany({
            where:{
                deleted: false,
            },
            orderBy:{
                id: 'asc',
            }
        })
    }

    delete(id: number) {
        return this.prismaService.user.delete({
            where:{ id }
        })
    }

    private async hashPassword(password: string) {
        const salt = await bcrypt.genSalt(10);
        return bcrypt.hash(password, salt);
    }

    async validatePassword(password: string, hash: string) {
        return bcrypt.compare(password, hash);
      }
}

