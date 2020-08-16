import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotAuthorizedError,
  NotFoundError,
  OrderStatus,
} from '@blackteam/commonlib';
import { Order } from '../models/order';
import { OrderCancelledPublisherEvent } from '../events/publishers/order-cancelled-event';
import { natsWrapper } from '../nats-wrapper';
const app = express.Router();

app.put(
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

    order.status = OrderStatus.Cancelled;

    await order.save();

    new OrderCancelledPublisherEvent(natsWrapper.client).publish({
      userId: order.userId,
      total: order.total,
      id: order.id,
      version: order.version,
      status: order.status,
      shopCartId: order.shopCartId,
    });

    res.send(order);
  }
);

export { app as updateOrderRouter };
