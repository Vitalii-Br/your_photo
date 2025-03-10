import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { PrismaService } from 'src/prisma.service';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';

//extends:  расширяется
@Injectable()
export class JwtStraregy extends PassportStrategy(Strategy) {
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

  async validate({ id }: Pick<User, 'id'>) {
    return this.prisma.user.findUnique({ 
      where: { id: id },
      include:{
        role:{
          include:{
            permissions: true
          }
        }
      } 
    
    });
  }
}
