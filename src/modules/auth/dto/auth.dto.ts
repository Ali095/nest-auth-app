import {
	IsEmail,
	IsString, Matches, MaxLength, MinLength,
} from "class-validator";

export class AuthDto {
	@IsEmail({}, { message: "Email is required" })
	email: string;

	@IsString()
	@MinLength(6)
	@MaxLength(32)
	@Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
		message: "Password is too week!",
	})
	password: string;
}
