import { Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AUTH_SERVICE_TOKEN } from 'auth/constants/auth.constants';
import { IAuthService, IJwtPayload } from 'auth/interfaces/auth.interfaces';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserDto } from 'user/dtos/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: IAuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.APP_SECRET,
      ignoreExpiration: false,
      passReqToCallback: false,
    });
  }

  validate(payload: IJwtPayload): Promise<UserDto> {
    return this.authService.verifyPayload(payload);
  }
}
