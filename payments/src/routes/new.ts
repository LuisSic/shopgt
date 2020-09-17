import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { stripe } from '../stripe';
import { natsWrapper } from '../nats-wrapper';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import {
  requireAuth,
  validateRequest,
  BadRequestError,
  NotFoundError,
  NotAuthorizedError,
  OrderStatus,
} from '@blackteam/commonlib';
import { Order } from '../models/orders';
import { Payment } from '../models/payments';

const router = express.Router();

router.post(
  '/api/payments',
  requireAuth,
  [
    body('token').not().isEmpty(),
    body('orderId').not().isEmpty(),
    body('email').isEmail(),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { token, orderId, email } = req.body;

    const order = await Order.findById(orderId);
    const orderCreated = await Payment.findOne({ orderId });
    if (!order) {
      throw new NotFoundError();
    }

    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    if (orderCreated) {
      throw new BadRequestError('Cannot pay for an completed order');
    }

    if (order.status === OrderStatus.Cancelled) {
      throw new BadRequestError('Cannot pay for an cancelled order');
    }

    const charge = await stripe.charges.create({
      currency: 'gtq',
      amount: order.total * 100,
      source: token,
    });

    const payment = Payment.build({
      orderId,
      stripeId: charge.id,
    });

    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
      id: payment.id,
      orderId: payment.orderId,
      stripeId: payment.stripeId,
      email,
      total: order.total,
    });

    res.status(201).send({ id: payment.id });
  }
);

export { router as createdChargeRouter };
