import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { userRepositoryMock } from '../../test/mocks/user/user-repository.mock';
import { mailerServiceMock } from '../../test/mocks/mailer-service-mock';
import { userServiceMock } from '../../test/mocks/user/user-service.mock';
import { userEntityList } from '../../test/mocks/user/user-entity-list.mock';
import { accessToken } from '../../test/mocks/tokens/access-token.mock';
import { jwtServiceMock } from '../../test/mocks/tokens/jwt-service.mock';
import { jwtPayload } from '../../test/mocks/tokens/jwt-payload.mock';
import { resetTokenMock } from '../../test/mocks/tokens/reset-token.mock';
import { authRegisterDTO } from '../../test/mocks/auth-register-dto.mock';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        userRepositoryMock,
        jwtServiceMock,
        userServiceMock,
        mailerServiceMock,
      ],
    }).compile();
    authService = module.get<AuthService>(AuthService);
  });

  test('Validate definition', () => {
    expect(authService).toBeDefined();
  });

  describe('Token', () => {
    test('Crate Token method', () => {
      const result = authService.createToken(userEntityList[0]);
      expect(result).toEqual({ accessToken });
    });
    test('checkToken method', () => {
      const result = authService.checkToken(accessToken);

      expect(result).toEqual(jwtPayload);
    });

    test('isValidToken method', () => {
      const result = authService.isValidToken(accessToken);

      expect(result).toEqual(true);
    });
  });

  describe('Authentication', () => {
    test('login method', async () => {
      const result = await authService.login('joao@gmail.com', '12345@bB6');
      expect(result).toEqual({ accessToken });
    });

    test('forget method', async () => {
      const result = await authService.forget('joao@hcode.com.br');

      expect(result).toEqual(true);
    });

    test('reset method', async () => {
      const result = await authService.reset('12345@bB6', resetTokenMock);

      expect(result).toEqual({ accessToken });
    });

    test('register method', async () => {
      const result = await authService.register(authRegisterDTO);

      expect(result).toEqual({ accessToken });
    });
  });
});
