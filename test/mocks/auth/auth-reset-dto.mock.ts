import { AuthResetDTO } from '../../../src/auth/dto/auth-reset.dto';
import { resetTokenMock } from '../tokens/reset-token.mock';

export const authResetDTO: AuthResetDTO = {
  password: '654321',
  token: resetTokenMock,
};
