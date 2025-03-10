import { Controller, Get, Param, UsePipes, ValidationPipe,Patch, Body, Delete, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/user.decorators';
import { CurrentUserDto } from './dto/user.dto'; 
import { Auth } from 'src/auth/decorators/auth.decorators';
import { AuthDto } from 'src/auth/auth.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Auth()
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  @Get('profile')
  async getUserProfile(@CurrentUser() dto:CurrentUserDto){
    console.log('GetUserProfile-dto =',dto)
   return this.userService.getAdminProfile(dto)
  };



  @Get('allUser')
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  async AllUser(){
   return this.userService.getAllUser()
  };

  @Get('userById/:id')
  @Auth()
  @HttpCode(200)
  async UserById(@Param('id') id: string){
     return this.userService.searchUserById(+id)
  };

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('updateUser/:id')
  async UpdateUser(@Param('id') id:string,@Body() dto:AuthDto){
  return this.userService.updateUser(+id,dto)
  };

  @Auth()
  @HttpCode(200)
  @Delete('delete/:id') 
  async DeleteUser(@Param('id') id: string){
  return this.userService.deleteUser(+id)
  };

}
