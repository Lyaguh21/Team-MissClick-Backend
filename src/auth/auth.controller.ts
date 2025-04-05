import { Body, Controller, Get, Post } from '@nestjs/common';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() dto: registerDto) {
    var localRegister = await this.authService.register(dto);
    return {
      id: localRegister.id,
      login: localRegister.login,
      name: localRegister.name,
    };
  }

  @Post("login")
  login(@Body() dto: loginDto) {
      return this.authService.login(dto)
  }
}
