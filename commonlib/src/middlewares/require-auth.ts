import { Request, Response, NextFunction } from 'express';
import { NotAuthorizedError } from '../errors/not-authorized-error';
import jwt from 'jsonwebtoken';

interface UserPayload {
  id: string;
  name: string;
  photo: string;
}

declare global {
  namespace Express {
    interface Request {
      session?: any;
      currentUser?: UserPayload;
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
    req.currentUser = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
  } catch (error) {
    throw new NotAuthorizedError();
  }

  next();
};
