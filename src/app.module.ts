import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import JwtStrategy from "./modules/user/jwt.strategy";
import AuthService from "./modules/user/services/auth.service";
import AuthController from "./modules/user/controllers/auth.controller";
import AuthModule from "./modules/user/user.module";

@Module({
    imports: [
        AuthModule,
        PassportModule,
        JwtModule.register({ secret: "secrete", signOptions: { expiresIn: "1h" } }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
})
export default class AppModule { }
