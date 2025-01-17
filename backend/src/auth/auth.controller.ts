import {
  Body,
  Controller,
  Delete,
  HttpCode,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @UsePipes(new ValidationPipe())
  // @HttpCode(200)
  @Post('register')
  async register(@Body() dto: AuthDto) {
    console.log('controller - DTO',dto)
    return this.authService.register(dto);
  }

  @Delete('id')
  async delete(@Param('id') id: string) {
    return this.authService.deleteUser(+id);
  }
}
