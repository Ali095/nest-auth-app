import * as Joi from "joi";
import { nodeEnv } from "./secrets.config";

export const validationSchema = Joi.object({
	nodeEnv: Joi.string().required(),
	port: Joi.number().default(nodeEnv === "development" ? 3000 : 8080),
	APIPrefix: Joi.string().required().default("api"),
	jwtSecret: Joi.string().default("thereIsNoSecretForCreatingJWT"),
	jwtExpiresIn: Joi.string().default("2h")
});

export default validationSchema;
