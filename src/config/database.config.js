"use strict";
exports.__esModule = true;
exports.registerDatabaseConfiguration = void 0;
var config_1 = require("@nestjs/config");
var index_1 = require("./index");
var CONNECTION_TYPE = "postgres";
exports.registerDatabaseConfiguration = (0, config_1.registerAs)(index_1.ConfigMapper.database, function () { return ({
    type: CONNECTION_TYPE,
    host: process.env.POSTGRES_HOST || "localhost",
    port: +process.env.POSTGRES_PORT || 5432,
    username: process.env.POSTGRES_USER || "postgres",
    password: process.env.POSTGRES_PASSWORD || "hello1234",
    database: process.env.POSTGRES_DB || "zapier",
    synchronize: process.env.NODE_ENV !== "prod",
    logging: true,
    entities: []
}); });
