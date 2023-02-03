import * as bcrypt from "bcrypt";

export const generateSalt = async (): Promise<string> => bcrypt.genSalt(5);

export const generateHash = async (str: string): Promise<string> => {
	const salt = await generateSalt();
	return bcrypt.hash(str, salt);
};

export const compareHashWithString = async (hash: string, str: string): Promise<boolean> => bcrypt.compare(str, hash);
