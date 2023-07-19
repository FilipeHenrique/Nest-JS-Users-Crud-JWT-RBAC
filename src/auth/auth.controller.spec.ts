import { Test, TestingModule } from '@nestjs/testing';
import { AuthGuard } from '../guards/auth.guard';
import { AuthController } from './auth.controller';
import { fileServiceMock } from '../../test/mocks/file-service.mock';
import { guardMock } from '../../test/mocks/guard.mock';
import { userEntityList } from '../../test/mocks/user/user-entity-list.mock';
import { getPhoto } from '../../test/mocks/get-photo.mock';
import { accessToken } from '../../test/mocks/tokens/access-token.mock';
import { authRegisterDTO } from '../../test/mocks/auth/auth-register-dto.mock';
import { authServiceMock } from '../../test/mocks/auth/auth-service.mock';
import { authLoginDTO } from '../../test/mocks/auth/auth-login-dto.mock';
import { authForgetDTO } from '../../test/mocks/auth/auth-forget-dto.mock';
import { authResetDTO } from '../../test/mocks/auth/auth-reset-dto.mock';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authServiceMock, fileServiceMock],
    })
      .overrideGuard(AuthGuard)
      .useValue(guardMock)
      .compile();

    authController = module.get<AuthController>(AuthController);
  });

  test('Validate definition', () => {
    expect(authController).toBeDefined();
  });

  describe('Authentication', () => {
    test('login method', async () => {
      const result = await authController.login(authLoginDTO);
      expect(result).toEqual({ accessToken });
    });
    test('register method', async () => {
      const result = await authController.register(authRegisterDTO);
      expect(result).toEqual({ accessToken });
    });
    test('forget method', async () => {
      const result = await authController.forget(authForgetDTO);
      expect(result).toEqual({ success: true });
    });
    test('reset method', async () => {
      const result = await authController.reset(authResetDTO);
      expect(result).toEqual({ accessToken });
    });
  });

  describe('Auth Routes', () => {
    test('uploadPhoto method', async () => {
      const photo = await getPhoto();
      const result = await authController.uploadPhoto(
        { user: userEntityList[0] },
        photo,
      );
      expect(result).toEqual(photo);
    });
  });
});
