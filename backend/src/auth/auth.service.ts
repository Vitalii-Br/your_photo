import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { AuthDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
  ) {}

  async oldUser(dto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    return user;
  }

  async register(dto: AuthDto) {

    console.log('Server-Dto',dto)
    const user = await this.oldUser(dto);
    if (user) {
      throw new BadRequestException('Такой аккаунт уже существует');
    }

    return this.prisma.user.create({
      data: {
        name: dto.name,
        surname: dto.surname,
        email: dto.email,
        garden: dto.garden,
        group: dto.group,
        password: await hash(dto.password),
      },
    });
  }

  async deleteUser (id: number){
   return  this.prisma.user.delete({
    where:{id}
 })
  }
}



