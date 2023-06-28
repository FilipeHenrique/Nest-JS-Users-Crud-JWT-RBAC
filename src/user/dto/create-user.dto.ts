import {
  IsString,
  IsEmail,
  IsStrongPassword,
  IsOptional,
  IsDateString,
  IsEnum,
} from 'class-validator';
import { Role } from 'src/enums/role.enums';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
  })
  password: string;

  @IsOptional()
  @IsDateString()
  birthAt: Date;

  @IsOptional()
  @IsEnum(Role)
  role: number;
}
