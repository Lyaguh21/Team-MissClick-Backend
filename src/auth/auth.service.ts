import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { registerDto } from './dto/register.dto';
import { UsersService } from 'users/users.service';
import { loginDto } from './dto/login.dto';
import { Tokens } from './interfaces';
import { compareSync } from 'bcrypt';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService){}


    async register(dto: registerDto){
        return this.usersService.save(dto).catch(err => {
            this.logger.error(err)
            return null;
        });

    }

    async login(dto: loginDto): Promise<Tokens> {
        const user: User = await this.usersService.findOne(dto.login).catch(err => {
            this.logger.error(err)
            return null;
        })
        if (!user || !compareSync(dto.password, user.password)) {
            throw new UnauthorizedException("Неверный логин или пароль");

        }
    }

    const accessToken = this.jwtService.sign({
        id: user.id,
        login: user.email
    })
}
