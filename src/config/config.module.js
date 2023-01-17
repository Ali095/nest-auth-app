"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.configurationModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var config_validation_1 = require("./config.validation");
var secrets_config_1 = require("./secrets.config");
var database_config_1 = require("./database.config");
var configurationModule = /** @class */ (function () {
    function configurationModule() {
    }
    configurationModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot({
                    cache: false,
                    isGlobal: true,
                    envFilePath: ".env",
                    load: [secrets_config_1.registerConfgurationSecrets, database_config_1.registerDatabaseConfiguration],
                    validate: config_validation_1.validateConfigurations
                }),
            ]
        })
    ], configurationModule);
    return configurationModule;
}());
exports.configurationModule = configurationModule;
