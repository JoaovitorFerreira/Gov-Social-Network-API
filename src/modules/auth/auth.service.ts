import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  Usuario,
  UserLoginRequest,
  RecoverPasswordInterface,
} from 'src/core/model/user.model';
import { UserService } from 'src/core/services/user.service';
import { v4 as uuidv4 } from 'uuid';
import { hashSync, compareSync } from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(
    login: UserLoginRequest,
  ): Promise<{ user: Usuario; access_token: string }> {
    const user = await this.userService.findByEmail(login.email);
    if (user == null) throw new NotFoundException();
    if (user && !compareSync(login.password, user.password))
      throw new UnauthorizedException();

    const payload = { sub: user.id, username: user.username };
    return {
      user: user,
      access_token: await this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
      }),
    };
  }

  async recoverPassword(userToRecover: string): Promise<boolean> {
    const user = await this.userService.findByEmail(userToRecover);
    if (user == null) throw new NotFoundException();
    else {
      const password = hashSync(`${user.email.split('@')[0]}123`, 12);
      const newUser = {
        ...user,
        password: password,
      };
      await this.userService.updateUser(newUser);
      return true;
    }
  }

  async changePass(
    userToChangePass: RecoverPasswordInterface,
  ): Promise<boolean> {
    const user = await this.userService.getUserById(userToChangePass.userId);
    if (user == null) throw new NotFoundException();
    else {
      const password = hashSync(userToChangePass.passToChange, 12);
      user.password = password;
      user.firstAccess = false;
      const updatedUser = await this.userService.updateUser(user);
      return updatedUser;
    }
  }

  async findAll(): Promise<Usuario[]> {
    return this.userService.findAllUsers();
  }

  async createUser(userDTO: Usuario): Promise<Usuario> {
    const newUid = uuidv4();
    const password = hashSync(`${userDTO.email.split('@')[0]}123`, 12);
    const newUser = {
      ...userDTO,
      id: newUid,
      firstAccess: true,
      password: password,
    };
    const createdUser = this.userService.createUser(newUser);
    return createdUser;
  }
}
