import { IsEmail, IsString } from "class-validator";

export class userDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @IsString()
    password: string;
}