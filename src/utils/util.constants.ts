export enum GeneralResponseMessage {
	SUCCESS = "Request completed successfully",
	WARN = "The request in not valid. Please try again with different params",
	ERROR = "The request failed with an error",
}

export enum PostgresErrorCode {
	UniqueViolation = "23505",
}
