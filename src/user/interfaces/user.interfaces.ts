import { CreateUserResponseDto } from '../dtos/create-user-response.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDto } from '../dtos/user.dto';
import { UserDocument } from '../models/user.schema';

export interface IUserRepository {
  findById: (id: string) => Promise<UserDocument>;
  findByUsername: (username: string) => Promise<UserDocument>;
  findAll: () => Promise<UserDocument[]>;
  save: (user: CreateUserDto) => Promise<UserDocument>;
}

export interface IUserService {
  create: (user: CreateUserDto) => Promise<CreateUserResponseDto>;
  findByUsername: (username: string) => Promise<UserDto>;
}
