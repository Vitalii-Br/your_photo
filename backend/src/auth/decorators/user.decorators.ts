import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
  Logger
} from '@nestjs/common';
import { User } from '@prisma/client';
import { MissingTokenException } from 'custom exclusion/tocken-exception';


// Получает текущие данные, текущего пользователя
// newUser  из  PrismaService и  стратегии
const logger = new Logger('CurrentUserDecorator');

export const CurrentUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user 
    const headers = request.headers 
    const bearerToken = headers['authorization'];
  
    let token: string | undefined;
    if (bearerToken && bearerToken.startsWith('Bearer ')) {
      token = bearerToken.split(' ')[1];
    }

    if (!token) {
      logger.warn('Токен отсутствует, пользователь не авторизован');
      throw new UnauthorizedException('Требуется авторизация для доступа');
    }

    return data
      ? { user: user[data], token }
      : { userData: { user: user!, token } };
  },

);

//  ========================================

/*
export const CurrentUser = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    const token = request.cookies['accessToken'];

    if (!token) {
      logger.error('Токен отсутствует');
      throw new MissingTokenException();
    }

    if (!user) {
      logger.error('Пользователь не авторизован');
      throw new UnauthorizedException('Пользователь не авторизован');
    }
    return data ? { [data]: user[data], token } : { user, token };;
  },
);

*/
