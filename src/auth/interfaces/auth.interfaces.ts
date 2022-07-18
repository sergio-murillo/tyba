import { LoginDto } from 'auth/dtos/login.dto';
import { CreateUserResponseDto } from 'user/dtos/create-user-response.dto';
import { CreateUserDto } from 'user/dtos/create-user.dto';
import { UserDto } from 'user/dtos/user.dto';

export interface IJwtPayload {
  sub: string;
  iat: number;
  exp: number;
}

export interface IAuthService {
  register: (user: CreateUserDto) => Promise<CreateUserResponseDto>;
  login: (username: string, password: string) => Promise<UserDto>;
  verifyPayload: (payload: IJwtPayload) => Promise<UserDto>;
  signToken: (user: LoginDto) => string;
  logout: () => void;
}
