import { Inject, Injectable, Logger } from '@nestjs/common';
import { USER_REPOSITORY_TOKEN } from '../constants/user.constants';
import { CreateUserResponseDto } from '../dtos/create-user-response.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserDto } from '../dtos/user.dto';
import { IUserRepository, IUserService } from '../interfaces/user.interfaces';

@Injectable()
export class UserService implements IUserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: IUserRepository,
  ) {}

  async create(user: CreateUserDto): Promise<CreateUserResponseDto> {
    const userSaved = await this.userRepository.save(user);
    this.logger.log(`Response create user [Id = ${userSaved?._id}]`);
    return { id: userSaved._id };
  }

  async findByUsername(username: string): Promise<UserDto> {
    const user = await this.userRepository.findByUsername(username);
    if (!user) throw `User ${username} does not exist`;

    this.logger.log(`Response find user by username [Id = ${user?._id}]`);
    return user;
  }
}
