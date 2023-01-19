import * as bcrypt from "bcrypt";

export const generateSalt = async (): Promise<string> => bcrypt.genSalt(15);

export const generateHash = async (str: string): Promise<string> => {
	const salt = await generateSalt();
	return bcrypt.hash(str, salt);
};

export const compareHashWithString = async (hash: string, str: string): Promise<boolean> => bcrypt.compare(str, hash);

export const toCamelCase = (str: string): string => str.replace(/([-_][a-z])/ig, ($1) => $1.toUpperCase().replace("-", "").replace("_", ""));

export const toSnakeCase = (str: string): string => str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);

export const isObject = (obj: unknown): boolean => obj === Object(obj) && !Array.isArray(obj) && typeof obj !== "function";

export const keysToCamel = (obj: Object | Array<any> | Record<any, any>) => {
	if (isObject(obj)) {
		const updated = {};
		Object.keys(obj).forEach((k) => { updated[toCamelCase(k)] = keysToCamel(obj[k]); });
		return updated;
	}
	if (Array.isArray(obj)) return obj.map((i) => keysToCamel(i));
	return obj;
};

export const keysToSnake = (obj: Object | Array<any> | Record<any, any>) => {
	if (isObject(obj)) {
		const updated = {};
		Object.keys(obj).forEach((k) => { updated[toSnakeCase(k)] = keysToSnake(obj[k]); });
		return updated;
	}
	if (Array.isArray(obj)) {
		return obj.map((i) => keysToSnake(i));
	}
	return obj;
};
