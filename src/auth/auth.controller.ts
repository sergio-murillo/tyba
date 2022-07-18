import {
  Body,
  Controller,
  HttpStatus,
  Inject,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthUser } from 'user/decorators/user.decorator';
import { CreateUserResponseDto } from 'user/dtos/create-user-response.dto';
import { CreateUserDto } from 'user/dtos/create-user.dto';
import { UserDto } from 'user/dtos/user.dto';
import { AUTH_SERVICE_TOKEN } from './constants/auth.constants';
import { LoginDto } from './dtos/login.dto';
import { JWTAuthGuard } from './guards/jwt-auth.guard';

import { LocalAuthGuard } from './guards/local-auth.guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { IAuthService } from './interfaces/auth.interfaces';

/**
 * Responsible for managing user authentication
 */
@ApiTags('Auth')
@Controller({ version: '1', path: 'auth' })
export class AuthController {
  constructor(
    @Inject(AUTH_SERVICE_TOKEN) private readonly authService: IAuthService,
  ) {}

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Register user',
  })
  @ApiBody({ type: [CreateUserDto] })
  @UseInterceptors(TokenInterceptor)
  @Post('register')
  async create(@Body() user: CreateUserDto): Promise<CreateUserResponseDto> {
    const response = await this.authService.register(user);
    return response;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Authenticate user',
  })
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(TokenInterceptor)
  async login(@AuthUser() user: LoginDto): Promise<UserDto> {
    return user;
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Logout user',
  })
  @Post('logout')
  @UseGuards(JWTAuthGuard)
  async logout(): Promise<{ status: number }> {
    this.authService.logout();
    return { status: HttpStatus.OK };
  }
}
