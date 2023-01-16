import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DbRepo } from "src/dataObjects/dbRepo";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";

const jwtFactory = {
	useFactory: async (configService: ConfigService) => ({
		secret: configService.get("JWT_SECRET"),
		signOptions: {
			expiresIn: configService.get("JWT_EXP_H"),
		},
	}),
	inject: [ConfigService],
};

@Module({
	imports: [
		JwtModule.registerAsync(jwtFactory),
		PassportModule.register({ defaultStrategy: "jwt" }),
	],
	controllers: [AuthController],
	providers: [AuthService, DbRepo, JwtStrategy],
	exports: [DbRepo, JwtModule, JwtStrategy, PassportModule],
})
export class AuthModule { }
