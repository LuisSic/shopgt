import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotAuthorizedError,
  NotFoundError,
} from '@blackteam/commonlib';
import { Order } from '../models/order';

const app = express.Router();

app.get(
  '/api/order/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const order = await Order.findById(req.params.orderId);

    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    res.send(order);
  }
);

export { app as getOrderByIdRouter };
