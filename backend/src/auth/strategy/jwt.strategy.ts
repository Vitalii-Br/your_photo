import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

//extends:  расширяется
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({id}: Pick<User, 'id'>): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(
        'Пользователь по токену из фронтенда не найден',
      );
    }

    return user;
  }
}

//=====================================
/*
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true, // Добавляем доступ к запросу в validate
    });
  }

  async validate({ id }: Pick<User, 'id'>): Promise<User> {
    console.log('ID-JwtStrategy =',id)
    const user = await this.prisma.user.findUnique({
      where: { id: id },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });
    console.log('user-JwtStrategy =',user)
    
    if (!user)
      throw new NotFoundException(
        ' пользователь по токену из фронтенда не найден',
      );

    return user;
  }
}
/*/
//========================================

/*
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request) => request?.cookies?.['access_token'], // Исправлено на access_token
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || 'your-secret-key',
    });
  }

  async validate({ id }: Pick<User, 'id'>): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        role: {
          include: {
            permissions: true,
          },
        },
      },
    });

    if (!user) {
      throw new UnauthorizedException('Пользователь не найден');
    }

    // Дополнительная проверка, если нужно
    // if (user.isBlocked) {
    //   throw new UnauthorizedException('Пользователь заблокирован');
    // }

    return user;
  }
}

*/
