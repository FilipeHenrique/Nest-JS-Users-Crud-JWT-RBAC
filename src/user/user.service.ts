import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDto } from './dto/update-put-user.dto';
import { UpdatePatchUserDto } from './dto/update-patch-user.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async create(data: CreateUserDTO) {
    if (await this.userRepository.exist({ where: { email: data.email } })) {
      throw new BadRequestException('This E-mail is already in use.');
    }
    data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    const user = this.userRepository.create(data);
    return this.userRepository.save(user);
  }

  async list() {
    return this.userRepository.find();
  }

  async show(id: number) {
    await this.exists(id);

    return this.userRepository.findOneBy({ id });
  }

  async update(
    id: number,
    { email, name, password, birthAt, role }: UpdatePutUserDto,
  ) {
    await this.exists(id);

    password = await bcrypt.hash(password, await bcrypt.genSalt());

    await this.userRepository.update(id, {
      email,
      name,
      password,
      birthAt: birthAt ? new Date(birthAt) : null,
      role,
    });

    return this.show(id);
  }

  async patch(
    id: number,
    { email, name, password, birthAt, role }: UpdatePatchUserDto,
  ) {
    await this.exists(id);

    const data: UpdatePatchUserDto = {};
    if (email) {
      data.email = email;
    }
    if (name) {
      data.name = name;
    }
    if (password) {
      data.password = await bcrypt.hash(data.password, await bcrypt.genSalt());
    }
    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (role) {
      data.role = role;
    }

    await this.userRepository.update(id, data);

    return this.show(id);
  }

  async delete(id: number) {
    await this.exists(id);

    return this.userRepository.delete(id);
  }

  async exists(id: number) {
    const exists = await this.userRepository.exist({
      where: {
        id,
      },
    });
    if (!exists) {
      throw new NotFoundException('User not found');
    }
  }
}
