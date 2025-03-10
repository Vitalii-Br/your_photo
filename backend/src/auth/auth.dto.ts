import {
  IsString,
  IsOptional,
  IsEmail,
  MinLength,
  IsNumber,
  IsArray,
} from 'class-validator';

export class AuthDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  surname: string;
  @IsEmail()
  // @IsString()
  email: string;

  @IsOptional()
  @IsString()
  garden: string;

  @IsOptional()
  @IsString()
  group: string;

  @MinLength(6, { message: 'пароль, не меньше 6 символов' })
  @IsString()
  password: string;

  @IsOptional()
  @IsNumber()
  roleId: number | null

  // @IsOptional()
  // @IsString({each:true})
  // fotoImage: string[]
}

export class UserDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;
  @IsString()
  surname: string;
  //@IsEmail()
  @IsString()
  email: string;
  @IsString()
  garden: string;
  @IsString()
  group: string;

  @IsOptional()
  @IsNumber()
  roleId: number | null

  // @IsArray() // Проверяет, что поле является массивом
  // @IsString({ each: true })
  // token: string []
}

export class LoginDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString({ each: true })
  @MinLength(6, { message: 'пароль, не меньше 6 символов' })
  password: string;
}

export class RefreshTokenDto {
  @IsString()
  refreshfTocen: string;
}
