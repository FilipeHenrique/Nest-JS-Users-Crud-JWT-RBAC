import { Role } from '../../../src/enums/role.enums';
import { UpdatePutUserDto } from '../../../src/user/dto/update-put-user.dto';

export const updatePutUserDTO: UpdatePutUserDto = {
  birthAt: '2000-01-01',
  email: 'joao@gmail.com',
  name: 'Joao',
  password: '12345@bB6',
  role: Role.Admin,
};
