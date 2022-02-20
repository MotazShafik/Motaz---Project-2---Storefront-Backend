import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT || 3000;

export const pepper = process.env.BCRYPT_PASSWORD;

export const saltRounds = process.env.SALT_ROUNDS;

export const tokenSecret = process.env.TOKEN_SECRET;

export default { port, pepper, saltRounds, tokenSecret };
