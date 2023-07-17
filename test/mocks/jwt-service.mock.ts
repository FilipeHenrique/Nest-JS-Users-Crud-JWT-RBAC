import { JwtModule } from '@nestjs/jwt';

export const jwtServiceMock = {
  provide: JwtModule,
  useValue: {
    sign: jest.fn(),
    verify: jest.fn(),
  },
};
