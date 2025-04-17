import {IsString,IsNumber, minLength, MinLength, IsEmail, IsOptional }from "class-validator"
import { RoleDto } from "src/role/dto/role.dto"

export class CurrentUserDto {
    userData:  UserDto 
    token: string
}

export class UserDto {
    @IsNumber()
    id: number

    @IsString()
    name: string

    @IsString()
    surname: string

    @IsEmail()
    email: string


    @MinLength(6,{message:'минимальное количество символов 6'})
    @IsString({each:true})
    password: string

    @IsNumber()
    roleId: number | null

    role:RoleDto | null
}



export class UpdateUserDto {
    @IsOptional()
    @IsNumber()
    id?: number

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    surname?: string

    @IsOptional()
    @IsEmail()
    email?: string


    @IsOptional()
    @MinLength(6,{message:'минимальное количество символов 6'})
    @IsString({each:true})
    password?: string

    @IsOptional()
    @IsNumber()
    roleId?: number | null

    @IsOptional()
    role?:RoleDto | null
}
