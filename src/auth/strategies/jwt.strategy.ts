import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IJwtPayload } from 'auth/interfaces/auth.interfaces';
import { AuthService } from 'auth/services/auth.service';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserDto } from 'user/dtos/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
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
