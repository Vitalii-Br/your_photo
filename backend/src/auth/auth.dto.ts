import{IsString, IsOptional,IsEmail,MinLength} from 'class-validator'

export class AuthDto {

  @IsString()
  name:   string
  @IsString()
  surname: string
  //@IsEmail()
  @IsString() 
  email:   string
  @IsString()
  garden:  string
  @IsString() 
  group:   string
  
  @MinLength(6,{message:'пароль, не меньше 6 символов'})
  @IsString()  
  password: string 
 

  @IsOptional()
  @IsString({each:true})
  fotoImage: string[]
}