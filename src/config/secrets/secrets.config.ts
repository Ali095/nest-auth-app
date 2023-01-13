export const nodeEnv: string = process.env.NODE_ENV ?? "development";
export const port: number = parseInt(process.env.PORT);
export const APIPrefix: string = "api";
export const jwtSecret: string = process.env.JWT_SECRET;
export const jwtExpiresIn: string = process.env.JWT_EXPIRY;
