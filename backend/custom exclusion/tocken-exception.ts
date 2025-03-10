import { HttpException, HttpStatus } from '@nestjs/common';

//Создаю касстомное исключение для  CurrentUser и getAdminProfile 
export class MissingTokenException extends HttpException {
  constructor() {
    super('Отсутствует токен', HttpStatus.UNAUTHORIZED);
  }
}