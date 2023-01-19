/* eslint-disable @typescript-eslint/naming-convention */
import {
	ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { HttpAdapterHost } from "@nestjs/core";
import { PostgresErrorCode } from "../utils/util.constants";
import { Secrets } from "../config/interfaces";
import { ConfigMapper } from "../config";

export interface ErrorResponse {
	status_code: number,
	timestamp: string,
	path: string,
	error_message: string,
	stack: unknown
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
	constructor(
		private readonly httpAdapterHost: HttpAdapterHost,
		private readonly configservice: ConfigService,
	) { }

	catch(exception: any, host: ArgumentsHost): void {
		// In certain situations `httpAdapter` might not be available in the
		// constructor method, thus we should resolve it here.
		const { httpAdapter } = this.httpAdapterHost;

		const ctx = host.switchToHttp();
		let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
		let errorMessage: string = "Error occured while processing the request";
		const stack: unknown = this.configservice.get<Secrets>(ConfigMapper.appConfig).nodeEnv !== "prod"
			? exception : "No stack in production";

		if (exception instanceof HttpException) {
			statusCode = exception.getStatus();
			errorMessage = exception.message;
		}

		if (exception.code === PostgresErrorCode.UniqueViolation) {
			statusCode = HttpStatus.CONFLICT;
			errorMessage = `The record already exists with same ${exception.detail?.split("=")[0]}`;
		}

		const responseBody: ErrorResponse = {
			status_code: statusCode,
			error_message: errorMessage,
			timestamp: new Date().toISOString(),
			path: httpAdapter.getRequestUrl(ctx.getRequest()),
			stack,
		};

		httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
	}
}
