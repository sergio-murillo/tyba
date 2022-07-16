import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { LoginDto } from 'auth/dtos/login.dto';
import { AuthService } from 'auth/services/auth.service';
import type { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class TokenInterceptor implements NestInterceptor {
  constructor(
    private readonly authService: AuthService,
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
