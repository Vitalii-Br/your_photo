import {IsString,IsNumber, minLength, MinLength, IsEmail }from "class-validator"
import { RoleDto } from "src/role/dto/role.dto"

export class CurrentUserDto {
    userData:  User
    token: string
}

export class User {
    @IsNumber()
    id: number

    @IsString()
    name: string

    @IsString()
    surname: string

    @IsEmail()
    email: string

    @IsString()
    garden: string

    @IsString()
    group: string

    @MinLength(6,{message:'минимальное количество символов 6'})
    @IsString({each:true})
    password: string

    @IsString()
    roleId: string | null

    userRole:RoleDto
}

