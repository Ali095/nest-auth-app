"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ApiLogger = void 0;
var common_1 = require("@nestjs/common");
var ApiLogger = /** @class */ (function () {
    function ApiLogger() {
        this.logger = new common_1.Logger("HTTP");
    }
    ApiLogger.prototype.use = function (request, response, next) {
        var _this = this;
        response.on("finish", function () {
            var method = request.method, originalUrl = request.originalUrl, ip = request.ip;
            var statusCode = response.statusCode, statusMessage = response.statusMessage;
            var contentLength = response.get("content-length");
            var userAgent = request.get("user-agent") || "";
            var message = "".concat(method, " ").concat(originalUrl, " ").concat(statusCode, " ").concat(statusMessage, " ").concat(contentLength, "b :: ").concat(userAgent, " ").concat(ip, " ");
            if (statusCode >= 500) {
                return _this.logger.error(message);
            }
            if (statusCode >= 400) {
                return _this.logger.warn(message);
            }
            return _this.logger.log(message);
        });
        next();
    };
    ApiLogger = __decorate([
        (0, common_1.Injectable)()
    ], ApiLogger);
    return ApiLogger;
}());
exports.ApiLogger = ApiLogger;
