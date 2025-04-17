import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CurrentUserDto, UpdateUserDto, UserDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';

import { hash } from 'argon2';

import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaServer: PrismaService,
    private readonly authService: AuthService,
  ) {}
  async getAdminProfile(dto: CurrentUserDto) {
    try {
      const { userData } = dto;
      return { ...userData };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        console.error(' Ошибка в getAdminProfile ', error);
        throw new UnauthorizedException('нет авторизации');
      } else {
        throw new Error('Ошибка в getAdminProfile,нет авторизации');
      }
    }
  }

  async getAllUser() {
    const allUser = await this.prismaServer.user.findMany({
      select: {
        id: true,
        name: true,
        surname: true,
        email: true,
        roleId: true,
        gardenId: true,
        role: {
          select: {
            name: true,
            permissions: true,
          },
        },
      },
    });
    return allUser;
  }

  async searchUserById(id: number) {
    const users = await this.getAllUser();
    const usersId = users.map((ell) => ell.id);
    const filterId = usersId.find((ell) => ell === id);

    if (filterId === undefined)
      throw new NotFoundException('пользователь с таким id отсутствует');
    const userById = await this.prismaServer.user.findUnique({
      where: { id },
    });
    return userById;
  }

  async updateUser(id: number, dto: UpdateUserDto) {
    const userid = await this.searchUserById(id);
    if (!userid) throw new NotFoundException('такой id отсутствует');

    const userData: any = { ...dto };
    if (dto.password) {
      userData.password = await hash(dto.password);
    } else {
      delete userData.password;
    }

    const update = await this.prismaServer.user.update({
      where: { id },
      data: userData,
    });
    return update;
  }

  async deleteUser(id: number) {
    try {
      const deleteUserById = await this.prismaServer.user.delete({
        where: { id },
      });
      return deleteUserById;
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        console.error(error);
        throw new NotFoundException(
          'такой пользователь с таким id отсутствует',
        );
      }
    }
  }
}
