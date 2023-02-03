/* eslint-disable @typescript-eslint/naming-convention */
import {
	Injectable, NestInterceptor, ExecutionContext, CallHandler,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ApiResponse } from "src/common/dtos";
import { ResponseMessageKey } from "../common/decorators/response.decorator";
import { GeneralResponseMessage } from "../common/constants/response.constants";
import { keysToSnake } from "../common/helpers/case.typing.helper";

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponse<T>> {
	constructor(private reflector: Reflector) { }

	intercept(context: ExecutionContext, next: CallHandler): Observable<ApiResponse<T>> {
		const { statusCode } = context.switchToHttp().getResponse();
		let responseMessage = this.reflector.get<string>(ResponseMessageKey, context.getHandler());

		if (!responseMessage) {
			if (statusCode >= 500) responseMessage = GeneralResponseMessage.ERROR;
			else if (statusCode >= 400) responseMessage = GeneralResponseMessage.WARN;
			else responseMessage = GeneralResponseMessage.SUCCESS;
		}

		return next.handle().pipe(map((data) => ({
			status_code: statusCode,
			reqId: context.switchToHttp().getRequest().reqId,
			message: responseMessage,
			data: keysToSnake(data),
			timestamp: new Date().toISOString(),
		})));
	}
}
