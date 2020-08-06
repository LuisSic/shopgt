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

const router = express.Router();

const generateJWT = (id: string, firstName: string) => {
  const userJwt = jwt.sign(
    {
      id: id,
      first_name: firstName,
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
    failureRedirect: '/api/users/fail',
  }),
  (req: Request, res: Response) => {
    const { id, first_name } = req.user!.data;
    const userJwt = generateJWT(id, first_name);

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send('Hello There Facebook');
  }
);

router.get(
  '/api/users/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/api/users/fail',
  }),
  (req: Request, res: Response) => {
    console.log(req.user);
    const { id, first_name } = req.user!.data;
    const userJwt = generateJWT(id, first_name);

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send('Hello There Google');
  }
);
router.get('/api/users/fail', (req: Request, res: Response) => {
  res.send('Failed attempt');
});

export { router as siginRouter };
