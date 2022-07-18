import { CreateUserDto } from 'user/dtos/create-user.dto';

export const UserDtoStub = (): CreateUserDto[] => [
  {
    code: '1121924123',
    name: 'Pepito Perez',
    email: 'pepito@gmail.com',
    city: 'Ciudad',
    country: 'Pais',
    username: 'pepito',
    password: '123456',
  },
];
