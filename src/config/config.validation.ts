/**
 * This is schema validation of all of the configuration files
 *
 * When we need to add an config variable which is important in boostraping the app
 * we need to add it here, so that it should not allow to boostrap the application
 * without that variable.
 */
import * as Joi from 'joi';
import { validationSchema } from './secrets/secrets.schema';
import * as secrets from './secrets/secrets.config';



const schemaListToValidate: Joi.ObjectSchema<any>[] = [validationSchema];


export function validateConfigurations(config: Record<string, any>): Record<string, any> {
	console.log(config);
	for (let index = 0; index < schemaListToValidate.length; index++) {
		const schema: Joi.ObjectSchema<any> = schemaListToValidate[index];
		const checkValidation: Joi.ValidationResult<any> = schema.validate(config, { allowUnknown: true, abortEarly: false });
		if (checkValidation.error)
			throw new Error("Invalid configurations for app to start. Error occured because " + checkValidation.error.message);
	}
	return config;
}

export default validateConfigurations;

