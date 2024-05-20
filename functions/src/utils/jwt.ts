import { badImplementationException } from './apiErrorHandler';
import jwt, { JwtPayload } from 'jsonwebtoken';
export const encodeJwt = (
  payload: string | Record<string, unknown> | Buffer,
  expiresIn: string | number,
  secret: 'refresh' | 'access' | 'default' = 'default',
) => {
  try {
    const SECRET =
      secret === 'refresh'
        ? process.env.JWT_REFRESH_SECRET
        : secret === 'access'
        ? process.env.JWT_ACCESS_SECRET
        : process.env.JWT_SECRET;
    if (!SECRET) throw badImplementationException('SECRET is not defined on env file');

    // TODO
    const token = jwt.sign(payload, SECRET, { expiresIn });

    return token;
  } catch (err: any) {
    throw err;
  }
};

export const decodeJwt = (jwtoken: string, secret: 'refresh' | 'access' | 'default' = 'default') => {
  try {
    const SECRET =
      secret === 'refresh'
        ? process.env.JWT_REFRESH_SECRET
        : secret === 'access'
        ? process.env.JWT_ACCESS_SECRET
        : process.env.JWT_SECRET;
    if (!SECRET) throw badImplementationException('SECRET is not defined on env file');

    // TODO
 // Verify the JWT token
    const decodedToken = jwt.verify(jwtoken, SECRET)as JwtPayload;
    return decodedToken;
  } catch (err: any) {
    throw err;
  }
};
