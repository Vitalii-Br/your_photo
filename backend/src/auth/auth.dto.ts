import {
  IsString,
  IsOptional,
  IsEmail,
  MinLength,
  IsNumber,
  IsArray,
  IsDate,
} from 'class-validator';

import { RoleDto } from 'src/role/dto/role.dto';

export class AuthDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @MinLength(6, { message: 'пароль, не меньше 6 символов' })
  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  roleId: number | null;

  @IsOptional()
  role?: RoleDto | null

  // @IsOptional()
  // @IsString({each:true})
  // fotoImage: string[]
}

export class AuthUserDto {
  @IsOptional()
  @IsNumber()
  id?: number;

  @IsOptional()
  @IsString()
  name?: string; // Now optional

  @IsOptional()
  @IsString()
  surname?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsNumber()
  roleId?: number | null;


  @IsOptional()
  role?: RoleDto | null

  // @IsArray() // Проверяет, что поле является массивом
  // @IsString({ each: true })
  // token: string []
}

export class LoginDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @IsString({ each: true })
  @MinLength(6, { message: 'пароль, не меньше 6 символов' })
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}

export class ValidateTokenDTO {
  @IsNumber()
  id: number;
  @IsNumber()
  iat: number;
  @IsNumber()
  exp: number;
}
