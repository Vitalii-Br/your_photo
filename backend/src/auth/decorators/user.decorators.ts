import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { Logger } from '@nestjs/common';
import { MissingTokenException } from 'custom exclusion/tocken-exception';

// Получает текущие данные, текущего пользователя
// newUser  из  PrismaService и  стратегии

const logger = new Logger('CurrentUserDecorator');

export const CurrentUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    const BearerToken = request.headers['authorization'];

    let token: string | undefined;
    if (BearerToken && BearerToken.startsWith('Bearer ')) {
      token = BearerToken.split(' ')[1];
    }

    if (!token) {
      logger.error('Токен отсутствует');
      throw new MissingTokenException();
    }

    if (!user) {
      logger.error('Пользователь не авторизован');
      throw new UnauthorizedException('Пользователь не авторизован');
    }

    return data
      ? { user: user[data], token: token }
      : { userData: { user: user, token: token } };
  },
);
