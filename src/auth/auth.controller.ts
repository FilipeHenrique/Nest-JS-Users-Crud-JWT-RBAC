import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthService } from './auth.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { AuthGuard } from 'src/guards/auth.guard';
import { FileService } from 'src/file/file.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly fileService: FileService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDTO) {
    return this.authService.login(email, password);
  }

  @Post('forget')
  async forget(@Body() { email }: AuthForgetDTO) {
    return this.authService.forget(email);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('reset')
  async reset(@Body() { password, token }: AuthResetDTO) {
    return this.authService.reset(password, token);
  }

  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(AuthGuard)
  @Post('photo')
  async uploadPhoto(
    @Req() request,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({
            fileType: 'image/jpeg',
          }),
          new MaxFileSizeValidator({
            maxSize: 1024 * 50,
          }),
        ],
      }),
    )
    photo: Express.Multer.File,
  ) {
    const user = request.user;
    const path = join(
      __dirname,
      '..',
      '..',
      'storage',
      'photos',
      `photo${user.id}.png`,
    );
    try {
      this.fileService.upload(path, photo);
      return { success: true };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
