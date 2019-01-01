import Express from 'express';
import { IResponseObject, MessageObject } from './ResponseObject';
import { ApiErrorUtil, ApiErrorSources, IApiErrorSource } from './ApiError';

export default class ApiResponseManager {
	resultData?: IResponseObject<any>;
	errorSource?: IApiErrorSource;

	get responded(): boolean {
		return (this.resultData != null || this.errorSource != null);
	}

	ok(data: string | IResponseObject<any>): void {
		if (this.responded) {
			throw new Error('already responded');
		}

		if (typeof data == 'string') {
			this.resultData = new MessageObject(data);
		}
		else {
			this.resultData = data;
		}
	}

	error(errorSource: IApiErrorSource): void {
		if (this.responded) {
			throw new Error('already responded');
		}

		this.errorSource = errorSource;
	}

	transport(res: Express.Response): void {
		if (!this.responded) {
			console.log('no response');
			this.error(ApiErrorSources.ServerError);
		}

		if (this.resultData != null) {
			res.status(200).json(this.resultData);
		}
		else if (this.errorSource != null) {
			const statusCode = this.errorSource.httpStatusCode;
			res.status(statusCode).json(ApiErrorUtil.build(this.errorSource));
		}
	}
}