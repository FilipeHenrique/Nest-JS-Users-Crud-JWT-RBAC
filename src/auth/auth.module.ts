import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PrismaModule } from 'src/database/prisma.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    JwtModule.register({
      secret: '%%1WU533X51TZNp*QDXBQQTjMwGy7RJd',
    }),
    UserModule,
    PrismaModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
