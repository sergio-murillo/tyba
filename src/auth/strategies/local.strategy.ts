import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AUTH_SERVICE_TOKEN } from 'auth/constants/auth.constants';
import { IAuthService } from 'auth/interfaces/auth.interfaces';
import { Strategy } from 'passport-local';
import { UserDto } from 'user/dtos/user.dto';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(@Inject(AUTH_SERVICE_TOKEN) private readonly authService: IAuthService) {
    super({
      usernameField: 'username',
      passReqToCallback: false,
    });
  }

  validate(username: string, password: string): Promise<UserDto> {
    return this.authService.login(username, password);
  }
}
