import {
	Injectable, NestInterceptor, ExecutionContext, CallHandler,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { ResponseMessageKey } from "../decorators/response.decorator";
import { GeneralResponseMessage } from "../utils/response.constants";

export interface Response<T> {
	statusCode: number;
	message: string;
	data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
	constructor(private reflector: Reflector) { }

	intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
		const { statusCode } = context.switchToHttp().getResponse();
		let responseMessage = this.reflector.get<string>(ResponseMessageKey, context.getHandler());

		if (!responseMessage) {
			if (statusCode >= 500) responseMessage = GeneralResponseMessage.ERROR;
			else if (statusCode >= 400) responseMessage = GeneralResponseMessage.WARN;
			else responseMessage = GeneralResponseMessage.SUCCESS;
		}

		return next.handle().pipe(map((data) => ({
			statusCode,
			reqId: context.switchToHttp().getRequest().reqId,
			message: responseMessage,
			data,
		})));
	}
}
