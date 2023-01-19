import {
  Body, Controller, Post, HttpCode, UseFilters,
} from "@nestjs/common";
import { AllExceptionsFilter } from "src/errors/general.error";
import { AuthService } from "../services/auth.service";
import { AuthDto } from "../dto/auth.dto";

@UseFilters(AllExceptionsFilter)
@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) { }

  @HttpCode(200)
  @Post("/signin")
  signinadasdasdasf(@Body() credentials: AuthDto): Promise<{ accessToken: string }> {
    return this.authService.signin(credentials);
  }

  @Post("/signup")
  signup(@Body() credentials: AuthDto): Promise<{ accessToken: string }> {
    return this.authService.signup(credentials);
  }
}
