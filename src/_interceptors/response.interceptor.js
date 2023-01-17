"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ResponseInterceptor = void 0;
var common_1 = require("@nestjs/common");
var operators_1 = require("rxjs/operators");
var response_decorator_1 = require("../decorators/response.decorator");
var response_constants_1 = require("../utils/response.constants");
var ResponseInterceptor = /** @class */ (function () {
    function ResponseInterceptor(reflector) {
        this.reflector = reflector;
    }
    ResponseInterceptor.prototype.intercept = function (context, next) {
        var statusCode = context.switchToHttp().getResponse().statusCode;
        var responseMessage = this.reflector.get(response_decorator_1.ResponseMessageKey, context.getHandler());
        if (!responseMessage) {
            if (statusCode >= 500)
                responseMessage = response_constants_1.GeneralResponseMessage.ERROR;
            else if (statusCode >= 400)
                responseMessage = response_constants_1.GeneralResponseMessage.WARN;
            else
                responseMessage = response_constants_1.GeneralResponseMessage.SUCCESS;
        }
        return next.handle().pipe((0, operators_1.map)(function (data) { return ({
            statusCode: statusCode,
            reqId: context.switchToHttp().getRequest().reqId,
            message: responseMessage,
            data: data
        }); }));
    };
    ResponseInterceptor = __decorate([
        (0, common_1.Injectable)()
    ], ResponseInterceptor);
    return ResponseInterceptor;
}());
exports.ResponseInterceptor = ResponseInterceptor;
