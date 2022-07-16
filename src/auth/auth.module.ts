import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AUTH_SERVICE_TOKEN } from './constants/auth.constants';
import { AuthService } from './services/auth.service';
import { SessionSerializer } from './session.serializer';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('app.secret'),
        signOptions: {
          expiresIn: '1d',
          algorithm: 'HS384',
        },
        verifyOptions: {
          algorithms: ['HS384'],
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    {
      provide: AUTH_SERVICE_TOKEN,
      useClass: AuthService,
    },
    LocalStrategy,
    JwtStrategy,
    SessionSerializer,
  ],
  controllers: [AuthController],
  exports: [AUTH_SERVICE_TOKEN],
})
export class AuthModule {}
