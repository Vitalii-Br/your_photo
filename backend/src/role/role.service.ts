import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import {
  PermissionRole,
  RoleDto,
  UpdatePermissionRole,
} from './dto/role.dto';
import { PrismaService } from 'src/prisma.service';
import { Permission } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async createRole(dto: RoleDto) {
    const { name, permissions } = dto;
    try {
      const newRole = await this.prisma.role.create({
        data: {
          name: name,
          permissions: {
            create: permissions.map((ell: Permission) => ({
              resource: ell.resource,
              actions: ell.actions,
            })),
          },
        },
        include: {
          permissions: {
            select: {
              id: true,
              resource: true,
              actions: true,
            },
          },
        },
      });

      return newRole || [];
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictException('Такая роль уже существует');
      }
    }
  }

  async getRoleById(idRole: number) {
    const role = await this.allRole();
    const allId = role?.map((ell: RoleDto) => ell.id);
    const filterId = allId?.find((ell: number) => idRole == ell);

    if (filterId === undefined) {
      throw new NotFoundException('такой id отсутствует');
    } else {
      try {
        const roleById = await this.prisma.role.findUnique({
          where: { id: idRole },
          select: {
            id: true,
            name: true,
            permissions: true,
          },
        });
        return roleById;
      } catch (error) {
        if (error instanceof NotFoundException) {
          throw new NotFoundException(
            'Пользователь не найден,так как id отсутствует',
          );
        }
      }
    }
  }

  async allRole() {
    const roles = await this.prisma.role.findMany({
      select: {
        id: true,
        name: true,
        permissions: true,
      },
    });

    return roles;
  }

  async deleteRole(id: number) {
    const role = await this.getRoleById(id);
    if (role) {
      return await this.prisma.role.delete({
        where: { id: id },
      });
    } else {
      throw new NotFoundException('такой id отсутствует');
    }
  }
  async updateRole(id: number, dto: RoleDto) {
    if (!dto) throw new NotFoundException();
    const { name, permissions } = dto;
    const idRole = await this.getRoleById(id);
    const permisionId = idRole?.permissions.map(
      (ell: PermissionRole) => ell.id,
    );
    if (!permisionId)
      throw new NotFoundException(
        'пользователь с таким id в permissions отсутствует',
      );
    try {
      const updaterole = await this.prisma.role.update({
        where: { id },
        data: {
          name: name,
          permissions: {
            update: permissions?.map((ell: UpdatePermissionRole) => ({
              where: { id: permisionId[0] },
              data: {
                resource: ell.resource,
                actions: ell.actions,
              },
            })),
          },
        },
        select: {
          id: true,
          name: true,
          permissions: true,
        },
      });

      return updaterole;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('id в permissions отсутствует');
      } else {
        throw new InternalServerErrorException('отсутствует id в permissions');
      }
    }
  }
}
