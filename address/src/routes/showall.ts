import express, { Request, Response } from 'express';
import { requireAuth } from '@blackteam/commonlib';
import { Address } from '../models/address';
const route = express.Router();

route.get('/api/address', requireAuth, async (req: Request, res: Response) => {
  const address = await Address.find({
    userId: req.currentUser!.id,
    status: true,
  });

  res.send(address);
});

export { route as getAllAddressRouter };
