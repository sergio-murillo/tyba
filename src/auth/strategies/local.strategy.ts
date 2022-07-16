import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from 'auth/services/auth.service';
import { Strategy } from 'passport-local';
import { UserDto } from 'user/dtos/user.dto';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'username',
      passReqToCallback: false,
    });
  }

  validate(username: string, password: string): Promise<UserDto> {
    return this.authService.login(username, password);
  }
}
