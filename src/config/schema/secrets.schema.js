"use strict";
exports.__esModule = true;
exports.validationSchema = void 0;
var Joi = require("joi");
exports.validationSchema = Joi.object({
    nodeEnv: Joi.string().required(),
    port: Joi.number()["default"](3000),
    APIPrefix: Joi.string().required()["default"]("api"),
    jwtSecret: Joi.string()["default"]("thereIsNoSecretForCreatingJWT"),
    jwtExpiresIn: Joi.string()["default"]("2h")
});
exports["default"] = exports.validationSchema;
