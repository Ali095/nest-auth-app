export interface Response {
	message: string;
	data: never;
	paginationOptions?: never
}

export const generateResponse = (message: string, data: never, paginated?: boolean): Response => ({ message, data });
