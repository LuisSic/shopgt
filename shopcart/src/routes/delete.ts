import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  NotFoundError,
  validateRequest,
  requireAuth,
  NotAuthorizedError,
} from '@blackteam/commonlib';
import { ShopCart } from '../models/shopcar';
const app = express.Router();

app.delete(
  '/api/shopcart/:productId',
  requireAuth,
  validateRequest,
  async (req: Request, res: Response) => {
    const { productId } = req.params;

    const userCart = await ShopCart.findOne({
      userId: req.currentUser!.id, //'12345asdf'
      orderId: '',
    }).populate('items.product');

    if (!userCart) {
      throw new NotFoundError();
    }

    if (userCart.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }

    const cartIndex = userCart.items.findIndex(
      (item) => item.product.id === productId
    );

    if (cartIndex < 0) {
      throw new NotFoundError();
    }

    userCart.items.splice(cartIndex, 1);

    await userCart.save();
    res.status(204).send({});
  }
);

export { app as deleteItemShopCartRouter };
