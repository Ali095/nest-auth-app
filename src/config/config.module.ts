import { ConfigModule } from "@nestjs/config";
import * as secrets from "./secrets/secrets.config";
import { validateConfigurations } from './config.validation';



const secretsConfiguration = () => ({ ...secrets });

export const configurationModule = ConfigModule.forRoot({
	isGlobal: true,
	load: [secretsConfiguration],
	validate: validateConfigurations,
	cache: false,
});

export default configurationModule;
