import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const headerAuth = req.headers.authorization;

  if (!headerAuth) {
    throw new Error('JWT token is missing');
  }

  const [, token] = headerAuth.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    return next();
  } catch {
    throw new Error('Invalid JWT token');
  }
};

export default ensureAuthenticated;
