import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ProfileController, AuthController } from "./controllers";
import JwtStrategy from "../../middlewares/jwt.strategy";
import AuthService from "./services/auth.service";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({ secret: "secrete", signOptions: { expiresIn: "1h" } }),
    ],
    providers: [AuthService],
    controllers: [AuthController, ProfileController],
})
class UserModule { }

export default UserModule;
export { UserModule };
