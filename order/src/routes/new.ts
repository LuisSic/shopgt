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
import { Address } from '../models/address';
const app = express.Router();

app.post(
  '/api/order',
  requireAuth,
  [
    body('total')
      .isFloat({ gt: 0 })
      .withMessage('Total must be greater than 0'),
    body('addressId').not().isEmpty().withMessage('Address Id must be defined'),
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
    body('date').isISO8601().withMessage('Date is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { total, addressId, shopCart, shopCartId, date } = req.body;

    const address = await Address.findById(addressId);

    if (!address) {
      throw new Error('Address Not Found');
    }

    const order = Order.build({
      userId: req.currentUser!.id,
      total,
      homeAddress: address,
      shopCart,
      status: OrderStatus.Created,
      shopCartId,
      dateOrder: new Date(date).toUTCString(),
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
