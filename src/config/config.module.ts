import { ConfigModule, registerAs } from "@nestjs/config";
import { Secrets } from "./interfaces/secrets.config";
// import { validateConfigurations } from "./config.validation";

export interface SecretConfig {
	nodeEnv: string;
	port: number;
	APIPrefix: string;
	jwtSecret: string;
	jwtExpiresIn: string;
}

export enum ConfigMapper {
	appConfig = "configurationSecrets",
}

const registerConfgurationSecrets = registerAs("configurationSecrets", (): SecretConfig => ({
	nodeEnv: process.env.NODE_ENV,
	port: parseInt(process.env.PORT, 10),
	APIPrefix: "api",
	jwtSecret: process.env.JWT_SECRET ?? "thereIsNoSecretForCreatingJWT",
	jwtExpiresIn: process.env.JWT_EXPIRY ?? "2h",
}));

export const configurationModule = ConfigModule.forRoot({
	cache: false,
	isGlobal: true,
	envFilePath: ".env",
	load: [registerConfgurationSecrets],
	// validate: validateConfigurations,
});
