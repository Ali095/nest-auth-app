import { ApiProperty } from "@nestjs/swagger/dist";
import {
	IsEmail,
	IsNotEmpty,
	IsString, Matches, MaxLength, MinLength,
} from "class-validator";
import { UserAuthentication } from "../auth.entity";

export class AuthDto {
	@IsEmail({}, { message: "Email is required" })
	@IsNotEmpty()
	@ApiProperty({ required: true, example: "Hassanali5062@gmail.com" })
	email: string;

	@IsString()
	@MinLength(6)
	@MaxLength(32)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: "Password is too weak",
	})
	@IsNotEmpty()
	@ApiProperty({ example: "Ali@11" })
	password: string;
}

export type AuthenticationResponse = {
	accessToken: string,
	user: UserAuthentication
};
