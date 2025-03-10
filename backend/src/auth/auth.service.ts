import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { AuthDto, UserDto, RefreshTokenDto } from './auth.dto';
import { RoleService } from 'src/role/role.service';
import { Response } from 'express';

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
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    return user;
  }

  async resultat(newUser: UserDto, res: Response) {
    const token = await this.createToken(newUser.id);
    if (!token) throw new NotFoundException('в resultat token не найден');
    const role = await this.getUserRole(newUser.id);
    if (!role) throw new NotFoundException('в resultat  role  не найдена');

    res.cookie('auth_token', token, {
      httpOnly: true, // Защита от XSS (недоступно через JavaScript)
      //secure: process.env.NODE_ENV === 'production', // Только HTTPS в продакшене
      secure: false,
      //sameSite: 'strict',
      sameSite: 'lax', // Защита от CSRF
      maxAge: 1 * 60 * 60 * 1000, // 1 час
      path: '/', // Доступно для всего приложения
    });

    return res.json({
      user: {
        id: newUser.id,
        name: newUser.name,
        surname: newUser.surname,
        email: newUser.email,
        garden: newUser.garden,
        group: newUser.group,
      },
      userRole: role,
      ...token,
    });
  }

  async register(dto: AuthDto, res: Response) {
    const user = await this.oldUser(dto);
    if (user) {
      throw new BadRequestException('Такой аккаунт уже существует');
    }

    const roles = await this.roleServer.allRole();
    const userRole = roles.find((role) => role.name === this.USER_ROLE_NAME);
    if (!userRole) {
      throw new NotFoundException('Роль "user" не найдена');
    }

    try {
      const newUser = this.prisma.user.create({
        data: {
          name: dto.name,
          surname: dto.surname,
          email: dto.email,
          garden: dto.garden,
          group: dto.group,
          password: await hash(dto.password),
          roleId: userRole.id,
        },
      })
      return await this.resultat(await newUser, res);
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error('Метод register', error);
        throw new NotFoundException('Ошибка при регистрации');
      } else {
        console.error('Метод register', error);
        throw new Error('Ошибка при регистрации.Метод register');
      }
    }
  };

  async validateUser(dto: AuthDto) {
    const userData = await this.oldUser(dto);
    if (!userData) {
      throw new UnauthorizedException('email не найден');
    }

    const validatePassword = await verify(userData.password, dto.password);
    if (!validatePassword) {
      throw new UnauthorizedException('пароль не подходит');
    }
    return userData;
  }

  async login(dto: AuthDto, res: Response) {
    try {
      const validadateLogin = await this.validateUser(dto);
      return await this.resultat(validadateLogin, res);
    } catch (error) {
      if (error instanceof NotFoundException) {
        console.error('Метод login', error);
        throw new NotFoundException('Ошибка при логировании.Метод login');
      } else {
        console.error('Метод login', error);
        throw new InternalServerErrorException(
          'Ошибка при логировании.Метод login',
        );
      }
    }
  }

  async createToken(userId: number) {
    const dataToken = { id: userId };
    const accessToken = this.jwt.sign(dataToken, { expiresIn: '1h' });
    const refresfTocen = this.jwt.sign(dataToken, { expiresIn: '7d' });
    return [{ accessToken: accessToken }, { refresfTocen: refresfTocen }];
  }

  async getNewToken(dto: RefreshTokenDto, res: Response) {
    // result данные из 2 части  токена
    const result = await this.jwt.verifyAsync(dto.refreshfTocen);
    if (!result) throw new UnauthorizedException('не верный токен');

    const user = await this.prisma.user.findUnique({
      where: { id: result.id },
    });

    if (!user)
      throw new UnauthorizedException('пользователь по токену не найден');

    return await this.resultat(user, res);
  }

  async searchTokenBayId(tokenId: number) {
    return this.createToken(tokenId);
  }

   async getToken (){

   }
}
