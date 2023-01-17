import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthDto } from "../dto/auth.dto";

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) { }

  async signup(credentials: AuthDto): Promise<{ accessToken: string }> {
    const accessToken: string = this.jwtService.sign(credentials);
    return { accessToken };
  }

  async signin(credentials: AuthDto): Promise<{ accessToken: string }> {
    if (credentials) {
      const accessToken: string = this.jwtService.sign(credentials);
      return { accessToken };
    }
    throw new UnauthorizedException("Incorrect login credentials!");
  }
}
