import { Body, Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { UserService } from 'src/core/services/user.service';
import { AuthGuard } from '../auth/auth.guards';
import { Usuario } from 'src/core/model/user.model';
import { FiltroUsuario } from 'src/core/model/filters.model';

@UseGuards(AuthGuard)
@Controller('perfil')
export class ProfileController {
  constructor(private readonly userService: UserService) {}

  @Put('editar-perfil')
  async updateProfile(@Body() userToUpdate: Usuario): Promise<boolean> {
    return await this.userService.updateUser(userToUpdate);
  }

  @Get('/:username')
  async getUserProfile(
    @Param('username') request: any,
  ): Promise<Usuario | null> {
    return await this.userService.findByUsername(request);
  }

  @Get('user/:userid')
  async getUserById(@Param('userid') request: any): Promise<Usuario | null> {
    return await this.userService.getUserById(request);
  }

  @Get()
  async filterUsersProfile(@Body() filter: FiltroUsuario): Promise<Usuario[]> {
    return await this.userService.filterUsers(filter);
  }
}
