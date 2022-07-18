import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { LoginDto } from '../../auth/dtos/login.dto';
import { Request } from 'express';

export const AuthUser = createParamDecorator(
  (data: keyof LoginDto, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>() as any;
    const user = request.user as LoginDto;

    return data ? user && user[data] : user;
  },
);
