import express, { Request, Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import('../strategies/facebook-auth');
import('../strategies/google-auth');

declare global {
  namespace Express {
    interface User {
      data?: any;
    }
  }
}

const CLIENT_HOME_PAGE_URL = 'http://localhost:3000';
const router = express.Router();

const generateJWT = (id: string, firstName: string, photo: string) => {
  const userJwt = jwt.sign(
    {
      id: id,
      name: firstName,
      photo,
    },
    process.env.JWT_KEY!,
    { expiresIn: '1h' }
  );

  return userJwt;
};
router.get(
  '/api/users/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);
router.get(
  '/api/users/google',
  passport.authenticate('google', { scope: ['profile'] })
);

router.get(
  '/api/users/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: CLIENT_HOME_PAGE_URL,
  }),
  (req: Request, res: Response) => {
    const { id, first_name, photo } = req.user!.data;
    const userJwt = generateJWT(id, first_name, photo);

    req.session = {
      jwt: userJwt,
    };

    res.redirect(CLIENT_HOME_PAGE_URL);
  }
);

router.get(
  '/api/users/google/callback',
  passport.authenticate('google', {
    failureRedirect: CLIENT_HOME_PAGE_URL,
  }),
  (req: Request, res: Response) => {
    const { id, first_name, photo } = req.user!.data;
    const userJwt = generateJWT(id, first_name, photo);

    req.session = {
      jwt: userJwt,
    };

    res.redirect(CLIENT_HOME_PAGE_URL);
  }
);

export { router as siginRouter };
