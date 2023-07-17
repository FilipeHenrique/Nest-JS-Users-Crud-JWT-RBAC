import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Patch,
  Delete,
  NotFoundException,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { RoleGuard } from '../guards/role.guard';
import { AuthGuard } from '../guards/auth.guard';
import { Role } from '../enums/role.enums';
import { Roles } from '../decorators/role.decorator';
import { LogInterceptor } from '../interceptors/log.interceptor';
import { ParamId } from '../decorators/param-id.decorator';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@UseInterceptors(LogInterceptor)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @Get()
  async findAll() {
    return this.userService.list();
  }

  @Get(':id')
  async readOne(@ParamId() id: number) {
    const user = await this.userService.show(id);
    if (user && user.id !== null) {
      return user;
    } else {
      throw new NotFoundException('User Not Found');
    }
  }

  @Put(':id')
  async update(@Body() data: UpdatePutUserDto, @ParamId() id: number) {
    return this.userService.update(id, data);
  }

  @Patch(':id')
  async updatePartial(@Body() data: UpdatePatchUserDto, @ParamId() id: number) {
    return this.userService.patch(id, data);
  }

  @Delete(':id')
  async delete(@ParamId() id: number) {
    return this.userService.delete(id);
  }
}
