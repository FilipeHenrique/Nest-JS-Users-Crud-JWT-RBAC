import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { userRepositoryMock } from '../../test/mocks/user/user-repository.mock';
import { jwtServiceMock } from '../../test/mocks/jwt-service.mock';

describe('AuthService', () => {
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, userRepositoryMock, jwtServiceMock],
    }).compile();
    authService = module.get<AuthService>(AuthService);
  });

  test('Validate definition', () => {
    expect(authService).toBeDefined();
  });

  
});
