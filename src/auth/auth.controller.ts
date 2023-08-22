import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto.';



@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  handleRegister(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.register(registerAuthDto)
  }

  @Post('login')
  handleLOgin(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.login(loginAuthDto)
  }


}