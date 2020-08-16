import express, { Request, Response } from 'express';
import { requireAuth } from '@blackteam/commonlib';
import { Order } from '../models/order';

const app = express.Router();

app.get('/api/order', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({ userId: req.currentUser!.id });

  res.send(orders);
});

export { app as getAllOrderRouter };
