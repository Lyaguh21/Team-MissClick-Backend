import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from 'src/dto/create.dto';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(dto: registerDto) {
    return this.usersService.save(dto);
  }

  async login(dto: loginDto) {
    const user = await this.usersService.findOne(dto.login);
    if (!user || !(await this.usersService.validatePassword(dto.password, user.password))) {
      throw new UnauthorizedException('Неверный логин или пароль');
    }
    const payload = { sub: user.id, login: user.login };
    return { access_token: this.jwtService.sign(payload) };
  }
}
