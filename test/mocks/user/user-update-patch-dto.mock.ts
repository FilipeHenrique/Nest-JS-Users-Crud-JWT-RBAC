import { Role } from '../../../src/enums/role.enums';
import { UpdatePatchUserDto } from '../../../src/user/dto/update-patch-user.dto';

export const updatePatchUserDTO: UpdatePatchUserDto = {
  role: Role.User,
};
