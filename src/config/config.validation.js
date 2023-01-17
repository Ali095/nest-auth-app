"use strict";
exports.__esModule = true;
exports.validateConfigurations = void 0;
var secrets_schema_1 = require("./schema/secrets.schema");
var schemaListToValidate = [secrets_schema_1.validationSchema];
function validateConfigurations(config) {
    return config;
    for (var index = 0; index < schemaListToValidate.length; index++) {
        var schema = schemaListToValidate[index];
        var checkValidation = schema
            .validate(config, { allowUnknown: true, abortEarly: false });
        if (checkValidation.error) {
            throw new Error("Invalid configurations for app to start. Error occured because ".concat(checkValidation.error.message));
        }
    }
    return config;
}
exports.validateConfigurations = validateConfigurations;
