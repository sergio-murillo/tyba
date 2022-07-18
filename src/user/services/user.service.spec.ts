import { Test, TestingModule } from '@nestjs/testing';
import { USER_REPOSITORY_TOKEN } from '../constants/user.constants';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserRepository } from '../repository/user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: UserRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: USER_REPOSITORY_TOKEN,
          useValue: {
            findById: jest.fn(),
            findByUsername: jest.fn(),
            findAll: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    service = app.get<UserService>(UserService);
    repository = app.get<UserRepository>(USER_REPOSITORY_TOKEN);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user', async () => {
    const _id = '00001';
    const createUser: CreateUserDto = {
      code: '1121924123',
      name: 'Pepito Perez',
      email: 'pepito@gmail.com',
      city: 'Ciudad',
      country: 'Pais',
      username: 'pepito',
      password: '123456',
    };

    jest
      .spyOn(repository, 'save')
      .mockImplementationOnce(() => Promise.resolve({ _id } as any));

    const result = await service.create(createUser);
    expect(result.id).toEqual(_id);
  });
});
