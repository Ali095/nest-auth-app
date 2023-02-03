import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, InsertResult } from "typeorm";
import { AuthDto, AuthenticationResponse } from "../dto/auth.dto";
import { UserAuthentication } from "../auth.entity";
import { generateHash, compareHashWithString } from "../../../common/helpers/encryption.helper";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserAuthentication)
    private authRepository: Repository<UserAuthentication>,
    private jwtService: JwtService,
  ) { }

  async signup(authenticationData: AuthDto): Promise<any> {
    const password = await generateHash(authenticationData.password);
    const newUser: InsertResult = await this.authRepository.insert({ ...authenticationData, password });
    const userId: string = newUser.identifiers[0].id;
    const accessToken: string = this.jwtService.sign({ email: authenticationData.email, userId });
    return { accessToken, user: { email: authenticationData.email, userId, role: "admin" } };
  }

  async signin(credentials: AuthDto): Promise<any> {
    const user = await this.authRepository.findOne({ where: { email: credentials.email } });
    if (user) {
      const isValid = await compareHashWithString(user.password, credentials.password);
      if (isValid) {
        const accessToken: string = this.jwtService.sign(credentials);
        return { accessToken, user: { email: credentials.email, userId: user.id, role: "admin" } };
      }
    }
    throw new UnauthorizedException("Incorrect login credentials");
  }
}
