import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth.config';

interface TokenPayload {
  iat: number,
  exp: number,
  sub: string
}

export default function ensureAuthenticated(request: Request, response: Response, next: NextFunction): void {
  const authorization = request.headers.authorization;

  if (!authorization) {
    throw new Error('JWT Token is missing');
  }

  const [, token] = authorization.split(' ');

  const { secret } = authConfig.jwt;

  try {
    const decoded = verify(token, secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub
    }

    return next();

  } catch (error) {
    throw new Error('Invalid token')
  }

}