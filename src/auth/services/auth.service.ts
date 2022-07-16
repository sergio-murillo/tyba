import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'auth/dtos/login.dto';
import { IAuthService, IJwtPayload } from 'auth/interfaces/auth.interfaces';
import { USER_SERVICE_TOKEN } from 'user/constants/user.constants';
import { CreateUserResponseDto } from 'user/dtos/create-user-response.dto';
import { CreateUserDto } from 'user/dtos/create-user.dto';
import { UserDto } from 'user/dtos/user.dto';
import { IUserService } from 'user/interfaces/user.interfaces';
import { checkPassword } from 'utils/security';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject(USER_SERVICE_TOKEN) private readonly userService: IUserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(signUp: CreateUserDto): Promise<CreateUserResponseDto> {
    const user = await this.userService.create(signUp);
    return user;
  }

  async login(username: string, password: string): Promise<UserDto> {
    try {
      const user = await this.userService.findByUsername(username);
      if (!(await checkPassword(password, user.password))) {
        throw new UnauthorizedException(
          `Wrong password for user with username: ${username}`,
        );
      }
      delete user.password;
      delete user.salt;
      return user;
    } catch (err) {
      throw new UnauthorizedException(
        `There isn't any user with username: ${username}`,
      );
    }
  }

  async verifyPayload(payload: IJwtPayload): Promise<UserDto> {
    try {
      const user = await this.userService.findByUsername(payload.sub);
      delete user.password;
      return user;
    } catch (error) {
      throw new UnauthorizedException(
        `There isn't any user with username: ${payload.sub}`,
      );
    }
  }

  signToken(user: LoginDto): string {
    const payload = {
      sub: user.username,
    };

    return this.jwtService.sign(payload);
  }

  logout(): void {
    this.jwtService.sign({ sub: null });
  }
}
