import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { AUTH_SERVICE_TOKEN } from 'auth/constants/auth.constants';
import { LoginDto } from 'auth/dtos/login.dto';
import { IAuthService } from 'auth/interfaces/auth.interfaces';
import { AuthService } from 'auth/services/auth.service';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Responsible for adding the token to the request response
 */
@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: IAuthService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<LoginDto>,
  ): Observable<LoginDto> {
    return next.handle().pipe(
      map((user) => {
        const response = context.switchToHttp().getResponse<Response>();
        const token = this.authService.signToken(user);

        response.setHeader('Authorization', `Bearer ${token}`);
        response.cookie('token', token, {
          httpOnly: true,
          signed: true,
          sameSite: 'strict',
          secure: process.env.NODE_ENV === 'production',
        });

        return user;
      }),
    );
  }
}
