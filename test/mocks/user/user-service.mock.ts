import { UserService } from '../../../src/user/user.service';

export const userServiceMock = {
  provide: UserService,
  useValue: {
    create: jest.fn(),
    show: jest.fn(),
  },
};
