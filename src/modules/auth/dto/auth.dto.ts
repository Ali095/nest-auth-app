import {
	IsEmail,
	IsString, Matches, MaxLength, MinLength,
} from "class-validator";
import { UserAuthentication } from "../auth.entity";

export class AuthDto {
	@IsEmail({}, { message: "Email is required" })
	email: string;

	@IsString()
	@MinLength(6)
	@MaxLength(32)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: "Password is too weak",
	})
	password: string;
}

export type AuthenticationResponse = {
	accessToken: string,
	user: UserAuthentication
};
