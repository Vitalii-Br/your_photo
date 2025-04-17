import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { AuthDto, AuthUserDto, RefreshTokenDto } from './auth.dto';
import { RoleService } from 'src/role/role.service';

@Injectable()
export class AuthService {
  private readonly USER_ROLE_NAME = 'user';
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly roleServer: RoleService,
  ) {}

  async getUserRole(id: number) {
    try {
      const role = await this.prisma.user.findUnique({
        where: { id: id },
        select: {
          roleId: true,
          role: {
            select: {
              id: true,
              name: true,
              permissions: true,
            },
          },
        },
      });
      return role;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('роль в getUserRole не найдена');
      }
    }
  }

  async oldUser(dto: AuthDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
        include: {
          role: {
            select: {
              id: true,
              name: true,
              permissions: true,
            },
          },
        },
      });

      return user;
    } catch (error) {
      console.error('Ошибка в oldUser '), error;
    }
  }

  async userById(id: number): Promise<AuthUserDto> {
    const role = await this.getUserRole(id);
    if (!role) throw new NotFoundException('отсутствуют  роли');

    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
        include: {
          role: {
            select: {
              id: true,
              name: true,
              permissions: true,
            },
          },
        },
      });
      return { ...user, ...role };
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error('ошибка в userById', error);
        throw new NotFoundException('пользователь с таким id не найден');
      } else {
        console.error('ошибка в userById', error);
        throw new Error('пользователь с таким id не найден');
      }
    }
  }

  async resultat(newUser: AuthUserDto) {
    if (newUser.id === undefined)
      throw new NotFoundException('в данных пользователя отсутствует id');

    const token = await this.createToken(newUser.id);
    if (!token) throw new NotFoundException('в resultat token не найден');

    const roles = await this.roleServer.allRole();
    const userRole = roles.find((ell) => ell.name === this.USER_ROLE_NAME);

    try {
      const user = {
        id: newUser.id,
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        roleId: userRole?.id,
        role: newUser.role,
      };
      return { user, token };
    } catch (error) {
      if (error instanceof NotImplementedException) {
        console.error('ошибка в resultat', error);
        throw new NotImplementedException('данные пользователя не созданы');
      } else {
        console.error('ошибка в resultat', error);
        throw new Error('данные пользователя не созданы');
      }
    }
  }

  async register(dto: AuthDto) {
    const user = await this.oldUser(dto);
    if (user) {
      throw new BadRequestException('Такой аккаунт уже существует');
    }

    const roles = await this.roleServer.allRole();
    if (!roles) {
      throw new NotFoundException('Отсутствуют  роли');
    }

    const userRole = roles.find((role) => role.name === this.USER_ROLE_NAME);
    if (!userRole) {
      throw new NotFoundException('Роль "user" не найдена');
    }

    try {
      const newUser = await this.prisma.user.create({
        data: {
          name: dto.name,
          surname: dto.surname,
          email: dto.email,
          password: await hash(dto.password),
          roleId: userRole.id,
        },
        include: {
          role: {
            select: {
              id: true,
              name: true,
              permissions: true,
            },
          },
        },
      });

      if (!newUser)
        throw new NotFoundException(
          'при регистрации епользователя произошла ошибка',
        );
      return await this.resultat(newUser);
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error('Метод register', error);
        throw new NotFoundException('Ошибка при регистрации');
      } else {
        console.error('Метод register', error);
        throw new Error('Ошибка при регистрации.Метод register');
      }
    }
  }

  async validateUser(dto: AuthDto) {
    const userData = await this.oldUser(dto);
    if (!userData) {
      throw new UnauthorizedException(['email не подходит']);
    }
    const validatePassword = await verify(userData.password, dto.password);
    if (!validatePassword) {
      throw new UnauthorizedException(['пароль не подходит']);
    }
    return userData;
  }

  async login(dto: AuthDto) {
    try {
      const validadateLogin = await this.validateUser(dto);

      return await this.resultat(validadateLogin);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }

      console.error('Метод login', error);
      throw new InternalServerErrorException('Ошибка при логировании');
    }
  }

  async createToken(userId: number) {
    try {
      const dataToken = { id: userId };
      const accessToken = await this.jwt.signAsync(dataToken, {
        expiresIn: '15m',
      });
      const refreshToken = await this.jwt.signAsync(dataToken, {
        expiresIn: '12h',
      });

      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (error) {
      console.error('ошибка в createToken', error);
      throw new BadRequestException('tokens пользователя не созданы');
    }
  }

  async newToken(dto: RefreshTokenDto) {
    try {
      const result = await this.jwt.verifyAsync(dto.refreshToken);
      const newToken = await this.createToken(result.id);
      console.log('New-Token =', newToken);
      return { ...newToken };
    } catch (error) {
      throw new UnauthorizedException(' токен не создан');
    }
  }
}
