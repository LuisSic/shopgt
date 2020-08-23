import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

interface UserPayload {
  id: string;
  name: string;
  photo: string;
}

router.get('/api/users/currentuser', (req: Request, res: Response) => {
  if (!req.session.jwt) {
    return res.send({ currentUser: req.currentUser || null });
  }

  try {
    req.currentUser = jwt.verify(
      req.session.jwt,
      process.env.JWT_KEY!
    ) as UserPayload;
  } catch (error) {}
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
