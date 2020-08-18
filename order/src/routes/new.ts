import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  OrderStatus,
} from '@blackteam/commonlib';
import { Order } from '../models/order';
import { OrderCreatedPublisherEvent } from '../events/publishers/order-created-event';
import { natsWrapper } from '../nats-wrapper';
const app = express.Router();

app.post(
  '/api/order',
  requireAuth,
  [
    body('total')
      .isFloat({ gt: 0 })
      .withMessage('Total must be greater than 0'),
    body('homeAddress')
      .not()
      .isEmpty()
      .withMessage('HomeAddress must be defined'),
    body('homeAddress.position.lat')
      .not()
      .isEmpty()
      .withMessage('lat is required'),
    body('homeAddress.position.long')
      .not()
      .isEmpty()
      .withMessage('long is required'),
    body('homeAddress.address')
      .not()
      .isEmpty()
      .withMessage('address is required'),
    body('homeAddress.country')
      .not()
      .isEmpty()
      .withMessage('country is required'),
    body('homeAddress.deparment')
      .not()
      .isEmpty()
      .withMessage('deparment is required'),
    body('homeAddress.township')
      .not()
      .isEmpty()
      .withMessage('township is required'),
    body('shopCart.*.product')
      .not()
      .isEmpty()
      .withMessage('you need to provide the product in the shopCart'),
    body('shopCart.*.quantity')
      .isInt({ gt: 0 })
      .withMessage('quantity must be greater than 0'),
    body('shopCartId')
      .not()
      .isEmpty()
      .withMessage('you need to provide the shopCartId in the Order'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { total, homeAddress, shopCart, shopCartId } = req.body;

    const order = Order.build({
      userId: req.currentUser!.id,
      total,
      homeAddress,
      shopCart,
      status: OrderStatus.Created,
      shopCartId,
    });

    await order.save();

    new OrderCreatedPublisherEvent(natsWrapper.client).publish({
      userId: order.userId,
      total: order.total,
      id: order.id,
      version: order.version,
      status: order.status,
      shopCartId: order.shopCartId,
    });

    res.status(201).send(order);
  }
);

export { app as createOrderRouter };
