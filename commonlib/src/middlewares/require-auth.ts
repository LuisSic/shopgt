import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      session?: any;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.jwt) {
    throw new NotAuthorizedError();
  }

  try {
    jwt.verify(req.session.jwt, process.env.JWT_KEY!);
  } catch (error) {
    throw new NotAuthorizedError();
  }

  next();
};
