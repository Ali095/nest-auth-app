"use strict";
exports.__esModule = true;
exports.registerConfgurationSecrets = void 0;
var config_1 = require("@nestjs/config");
var index_1 = require("./index");
exports.registerConfgurationSecrets = (0, config_1.registerAs)(index_1.ConfigMapper.appConfig, function () {
    var _a, _b;
    return ({
        nodeEnv: process.env.NODE_ENV || "development",
        port: parseInt(process.env.PORT, 10) || 3000,
        APIPrefix: "api",
        jwtSecret: (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "thereIsNoSecretForCreatingJWT",
        jwtExpiresIn: (_b = process.env.JWT_EXPIRY) !== null && _b !== void 0 ? _b : "2d"
    });
});
