import { Body, Controller, Get, Post } from '@nestjs/common';
import { dot } from 'node:test/reporters';
import { loginDto } from './dto/login.dto';
import { registerDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
    @Post('register')
    register(@Body() dto: registerDto) {}

    @Post("login")
    login(@Body() dto: loginDto) {}

    @Get("refresh")
    refreshTokens() {}
}
