import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleDto } from './dto/role.dto';
import { Permission } from '@prisma/client';
import { Auth } from 'src/auth/decorators/auth.decorators';
import { CurrentUser } from 'src/auth/decorators/user.decorators';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('create')
  @UsePipes(new ValidationPipe())
  create(@Body() dto: RoleDto) {
    return this.roleService.createRole(dto);
  }

  @Get('allRoles')
  @Auth()
  allRoles(@CurrentUser('id') id: string) {
    if (!id)
      throw new NotFoundException(' токен после авторизации  отсутствует');
    return this.roleService.allRole();
  }

  @Get('RoleById/:id')
  @UsePipes(new ValidationPipe())
  getRoleById(@Param('id') idRole: string) {
    return this.roleService.getRoleById(+idRole);
  }

  @Patch('update/:id')
  updateRole(@Param('id') id: string, @Body() dto: RoleDto) {
    return this.roleService.updateRole(+id, dto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.roleService.deleteRole(+id);
  }
}
