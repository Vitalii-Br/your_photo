import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RefreshTokenDto } from './auth.dto';
import { Auth } from './decorators/auth.decorators';
import { Response,Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto, @Res() res: Response) {
    return this.authService.register(dto, res);
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async login(@Body() dto: AuthDto, @Res() res: Response, @Req() req: Request) {
    console.log('Request received:', {
      body: dto,
      headers: req.headers,
    });
    return this.authService.login(dto, res);
  }

  @Get('tokenById/:id')
  async getTokenById(@Param('id') tokenId: string) {
    return this.authService.searchTokenBayId(+tokenId);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Auth()
  @Post('login/accessToken')
  async GetNewRefreshToken(@Body() dto: RefreshTokenDto, @Res() res: Response) {
    return this.authService.getNewToken(dto, res);
  }
}
