import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule, JwtModuleOptions } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./controllers/auth.controller";
import { AuthService } from "./services/auth.service";
import { Secrets } from "../../config/interfaces";
import { ConfigMapper } from "../../config";
import { UserAuthentication } from "./auth.entity";

const jwtFactory = {
	useFactory: async (configService: ConfigService): Promise<JwtModuleOptions> => {
		const appConfig = configService.get<Secrets>(ConfigMapper.appConfig);
		return {
			secret: appConfig.jwtSecret,
			signOptions: { expiresIn: appConfig.jwtExpiresIn },
		};
	},
	inject: [ConfigService],
};

@Module({
	imports: [
		JwtModule.registerAsync(jwtFactory),
		PassportModule.register({ defaultStrategy: "jwt" }),
		TypeOrmModule.forFeature([UserAuthentication]),
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy],
	exports: [JwtModule, JwtStrategy, PassportModule],
})
export class AuthModule { }
