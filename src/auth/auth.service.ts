import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private issuer = 'login';
  private audience = 'users';

  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createToken(user: User) {
    return {
      accesToken: this.jwtService.sign(
        {
          sub: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });
      return data;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail or password incorrect.');
    }

    return this.createToken(user);
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('E-mail incorrect.');
    }

    return true;
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data);
    return this.createToken(user);
  }

  async reset(password: string, token: string) {
    const id = 1;
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password: password,
      },
    });

    return this.createToken(user);
  }
}
