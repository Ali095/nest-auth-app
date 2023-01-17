"use strict";
exports.__esModule = true;
exports.ResponseMessage = exports.ResponseMessageKey = void 0;
var common_1 = require("@nestjs/common");
exports.ResponseMessageKey = "ResponseMessageKey";
var ResponseMessage = function (message) { return (0, common_1.SetMetadata)(exports.ResponseMessageKey, message); };
exports.ResponseMessage = ResponseMessage;
