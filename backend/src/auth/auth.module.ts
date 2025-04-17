import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { getJwtConfig } from './config/jwt.config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RoleModule } from 'src/role/role.module';

//inject: внедрения зависимостей
@Module({
  imports:[
    ConfigModule,
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory: getJwtConfig
    }),
    RoleModule
  ],
  controllers: [AuthController],
  providers: [AuthService,PrismaService,JwtStrategy],
  exports: [AuthService]
})
export class AuthModule {}
