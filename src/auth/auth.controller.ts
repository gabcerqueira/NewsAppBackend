import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IauthController } from './interfaces/Iauth.controller';
import { Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { User } from 'src/user/schema/user.schema';
import { ParamsDictionary } from 'express-serve-static-core';
import { DecodedToken } from './dto/decodedToken';

@ApiTags('Módulo de login')
@Controller('auth')
export class AuthController implements IauthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('testAuth')
  testAuth(@Req() req: Request): any {
    return req.user;
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'Login no sistema por email e senha' })
  async login(@Req() req: Request, @Body() loginDto: LoginDto) {
    return await this.authService.login(req.user as User);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('refresh')
  @ApiOperation({ summary: 'Renovar o token' })
  async refresh(@Req() req: Request) {
    console.log('REQ.USER : ', req.user);
    return await this.authService.refresh(req.user as DecodedToken);
  }
}
