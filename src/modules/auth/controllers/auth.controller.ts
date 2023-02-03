import {
  Body, Controller, HttpStatus, Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ApiDocument } from "src/common/decorators/response.document.decorator";
import { AuthService } from "../services/auth.service";
import { AuthDto } from "../dto/auth.dto";

interface authData {
  accessToken: string,
  user: {
    email: string, userId: string, role: string
  }
}

@ApiTags("Authentication")
@Controller({ path: "auth", version: "1" })
export class AuthController {
  constructor(private authService: AuthService) { }

  @ApiDocument({
    successStatusCode: 200,
    operationDescription: "Authentication request for user to fetch the access token",
    responseDescription: "User auhtenticated with valid credentials and granted access token",
    returnDataExample: { accessToken: "authentication token", user: { email: "email@xyz.com", userId: "UUID-of-user", role: "admin" } }
  })
  @Post("/signin")
  signin(@Body() credentials: AuthDto) {
    return this.authService.signin({ ...credentials, email: credentials.email.toLowerCase() });
  }

  @ApiDocument({
    successStatusCode: 202,
    operationDescription: "Registeration request for user to register in system and get the access token",
    responseDescription: "User registered successfully and granted access token",
    returnDataExample: { accessToken: "authentication token", user: { email: "email@xyz.com", userId: "UUID-of-user", role: "admin" } },
    errorResponses: [409, 400, 404, 401, 403],
  })
  @Post("/signup")
  signup(@Body() credentials: AuthDto): Promise<{ accessToken: string }> {
    return this.authService.signup({ ...credentials, email: credentials.email.toLowerCase() });
  }
}
