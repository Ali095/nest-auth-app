import { applyDecorators, HttpCode, Logger, Type } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { NotImplementedException } from "@nestjs/common/exceptions";
import {
	ApiOkResponse,
	getSchemaPath,
	ApiExtraModels,
	ApiUnauthorizedResponse,
	ApiForbiddenResponse,
	ApiNotFoundResponse,
	ApiInternalServerErrorResponse,
	ApiOperation,
	ApiAcceptedResponse,
	ApiNoContentResponse,
	ApiCreatedResponse,
	ApiBadRequestResponse,
	ApiConflictResponse,
} from "@nestjs/swagger";
import { isObject, keysToSnake, toSnakeCase } from "src/common/helpers/case.typing.helper";
import { ApiResponse, ErrorResponse } from "../dtos";

export type ResponseErrorTypes = HttpStatus.BAD_REQUEST | HttpStatus.UNAUTHORIZED | HttpStatus.FORBIDDEN |
	HttpStatus.NOT_FOUND | HttpStatus.CONFLICT;

interface BaseDocumentationParams {
	operationDescription: string,
	responseDescription: string,
	errorResponses?: ResponseErrorTypes[],
	successStatusCode?: HttpStatus.ACCEPTED | HttpStatus.CREATED | HttpStatus.OK | HttpStatus.NO_CONTENT,
}

interface CustomDataDocParams extends BaseDocumentationParams {
	returnDataExample: Array<any> | string | number | boolean | Record<string, any>
}

interface DtoDocParams extends BaseDocumentationParams {
	returnDataDto: Type<any>,
}

export type DocumentationParams = CustomDataDocParams | DtoDocParams;

const defaultparams: Partial<DocumentationParams> = {
	successStatusCode: 200,
	errorResponses: [HttpStatus.BAD_REQUEST, HttpStatus.FORBIDDEN],
};

const generateDataSchema = (sampleData) => {
	let dataSchema;
	if (Array.isArray(sampleData)) {
		dataSchema = { type: "array", items: generateDataSchema(sampleData[0]) };
	} else {
		switch (typeof sampleData) {
			case "string":
				dataSchema = { type: "string", example: sampleData };
				break;
			case "number":
				dataSchema = { type: "number", example: sampleData };
				break;
			case "boolean":
				dataSchema = { type: "boolean", example: sampleData };
				break;
			default: {
				if (isObject(sampleData)) {
					const properties = {};
					for (const key in sampleData) {
						if (Object.prototype.hasOwnProperty.call(sampleData, key)) {
							const element = sampleData[key];
							const propertyKey = toSnakeCase(key);
							properties[propertyKey] = generateDataSchema(element);
						}
					}
					dataSchema = { properties };

				} else dataSchema = { type: "object", example: keysToSnake(sampleData) };

			} break;
		}
	}
	return dataSchema;
};

const fetchDecoratorForSuccessResponse = (statusCode: number, description: string, schema: any): MethodDecorator => {
	switch (statusCode) {
		case HttpStatus.OK: return ApiOkResponse({ description, schema });

		case HttpStatus.ACCEPTED: return ApiAcceptedResponse({ description, schema });

		case HttpStatus.CREATED: return ApiCreatedResponse({ description, schema });

		case HttpStatus.NO_CONTENT: return ApiNoContentResponse({ description, schema });

		default: throw new NotImplementedException({ message: `Failed to load swagger docs. The success response decorator for ${statusCode} is not found. Please implement it before passing it in ApiDocument decorator` });
	}
};

const getResponseErrorsDecorators = (statusCodes: HttpStatus[]): MethodDecorator[] => {
	const errorDecorators: MethodDecorator[] = [
		ApiInternalServerErrorResponse({
			description: "Internal server error occured while processing the request, please try again in some time and if facing this error repeatedly and you are sure you passed correct and validated params/body, please contact admin.",
			schema: { allOf: [{ $ref: getSchemaPath(ErrorResponse) }] },
		})];

	statusCodes?.forEach((code) => {
		switch (code) {
			case HttpStatus.BAD_REQUEST:
				errorDecorators.push(ApiBadRequestResponse({ description: "Invalid Request, please revisit the params or request body because one of them is not validated from server.\n The return schema for bad request error will be same as of 500, but with different message and errors" }));
				break;
			case HttpStatus.UNAUTHORIZED:
				errorDecorators.push(ApiUnauthorizedResponse({ description: "The access token provided in request cannot be authenticated. The return schema for unaothorize access error will be same as of 500, but with different message and errors" }));
				break;
			case HttpStatus.FORBIDDEN:
				errorDecorators.push(ApiForbiddenResponse({ description: "The action you want to do is not intended to work for your access, if you forget to log in with different credentials, please use /signin. The return schema for access forbidden error will be the same as of 500, but with different message and errors." }));
				break;
			case HttpStatus.NOT_FOUND:
				errorDecorators.push(ApiNotFoundResponse({ description: "The resource you are looking for cannot be found in system, try to revalidate you paths for API and ids for specific resources. The return schema for not-found error will be same as of 500, but with different message and errors" }));
				break;
			case HttpStatus.CONFLICT:
				errorDecorators.push(ApiConflictResponse({ description: "The record you are trying to create in system has some duplicated values which should be unique like username, email, etc.... The return schema for conflict error will be same as of 500, but with different message and errors" }));
				break;

			default: throw new NotImplementedException({ message: `Failed to load swagger docs. The error response decorator for ${code} is not found. Please implement it before passing it in ApiDocument decorator` });
		}
	});

	return errorDecorators;
};

/**
 * Initialize the route and decorate as per params requirement
 * @param params DocumentationParams
 * @returns Group of Decorators which are necessary and repitive in each function
 */
export const ApiDocument = (params: DocumentationParams = Object.assign(defaultparams)) => {
	const decorators: MethodDecorator[] = [];

	decorators.push(HttpCode(params.successStatusCode));
	decorators.push(ApiOperation({ description: params.operationDescription }));
	decorators.push(ApiExtraModels(ApiResponse, ErrorResponse));

	let typeSchemaForData;
	if ("returnDataDto" in params) {
		decorators.push(ApiExtraModels(params.returnDataDto));
		typeSchemaForData = { allOf: [{ $ref: getSchemaPath(params.returnDataDto) }] };
	} else {
		typeSchemaForData = generateDataSchema(params.returnDataExample);
	}

	const responseSchema = {
		allOf: [{ $ref: getSchemaPath(ApiResponse) },
		{ properties: { data: typeSchemaForData } }],
	};

	decorators.push(
		fetchDecoratorForSuccessResponse(params.successStatusCode, params.responseDescription, responseSchema),
	);

	// Documenting the errors for swagger
	const { errorResponses } = params;

	decorators.push(...getResponseErrorsDecorators(errorResponses));

	return applyDecorators(...decorators);
};
