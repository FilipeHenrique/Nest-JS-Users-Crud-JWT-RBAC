import { Role } from '../../../src/enums/role.enums';
import { CreateUserDTO } from '../../../src/user/dto/create-user.dto';

export const createUserDTO: CreateUserDTO = {
  birthAt: '2000-01-01',
  email: 'joao@gmail.com',
  name: 'Joao',
  password: '12345@bB6',
  role: Role.Admin,
};
