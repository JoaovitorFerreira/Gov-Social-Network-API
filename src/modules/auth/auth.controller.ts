import { Controller, Post, Get, Body, Put } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  RecoverPasswordInterface,
  UserLoginRequest,
  Usuario,
} from 'src/core/model/user.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(
    @Body() userToLogin: UserLoginRequest,
  ): Promise<{ access_token: string }> {
    return this.authService.login(userToLogin);
  }

  @Post('recuperar-senha')
  async recoverPassword(@Body() userToRecover: string): Promise<boolean> {
    return this.authService.recoverPassword(userToRecover);
  }

  //teste de rota com guard
  @Get('login-test')
  async exibeLogin() {
    return this.authService.findAll();
  }

  @Put('change-pass')
  async changePass(
    @Body() userToChange: RecoverPasswordInterface,
  ): Promise<boolean> {
    return this.authService.changePass(userToChange);
  }

  @Post('create-user')
  async createUser(@Body() userToCreate: Usuario) {
    return this.authService.createUser(userToCreate);
  }
}
