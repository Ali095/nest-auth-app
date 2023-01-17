import { registerAs } from "@nestjs/config";
import { ConfigMapper } from "./index";
import { DatabaseOptions } from "./interfaces";

const CONNECTION_TYPE = "postgres";

export const registerDatabaseConfiguration = registerAs(ConfigMapper.database, (): DatabaseOptions => ({
	type: CONNECTION_TYPE,
	host: process.env.POSTGRES_HOST || "localhost",
	port: +process.env.POSTGRES_PORT || 5432,
	username: process.env.POSTGRES_USER || "postgres",
	password: process.env.POSTGRES_PASSWORD || "hello1234",
	database: process.env.POSTGRES_DB || "zapier",
	synchronize: process.env.NODE_ENV !== "prod",
	logging: true,
	entities: [], // `${__dirname}/../**/*.entity.ts`
}));
