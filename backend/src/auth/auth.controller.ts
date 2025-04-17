import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, RefreshTokenDto } from './auth.dto';
import { Auth } from './decorators/auth.decorators';
import { CurrentUser } from './decorators/user.decorators';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //@UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  
  @HttpCode(200)
  @Post('front/refreshToken')
  async GetNewRefreshToken(
    @CurrentUser('email') email:string | null,
    @Body() dto: RefreshTokenDto) {
      console.log('Email =',email)
      if (!email) {
        // Пользователь не авторизован
        return { success: false, message: 'Требуется авторизация для обновления токена' };
      }
    return this.authService.newToken(dto);
  }
}
