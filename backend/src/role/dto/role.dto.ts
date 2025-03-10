import {
  Actions as PrismaActions,
  Resource as PrismaResource,
} from '@prisma/client';
import {
  IsNumber,
  IsString,
  IsEnum,
  IsNotEmpty,
  ValidateNested,
  ArrayUnique,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class RoleDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString({ each: true })
  name: string;

  @ValidateNested()
  @Type(() => PermissionRole)
  permissions: PermissionRole[];
}

export class PermissionRole {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsEnum(PrismaResource)
  resource: PrismaResource;

  @IsEnum(PrismaActions, { each: true })
  @ArrayUnique()
  actions: PrismaActions[];
}

export class UpdatePermissionRole {
  //@IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsEnum(PrismaResource)
  resource: PrismaResource;

  @IsOptional()
  @IsEnum(PrismaActions, { each: true })
  @ArrayUnique()
  actions: PrismaActions[];
}
