import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  NotFoundError,
  validateRequest,
  requireAuth,
} from '@blackteam/commonlib';
import { ShopCart } from '../models/shopcar';
import { Product } from '../models/product';
const app = express.Router();

app.post(
  '/api/shopcart',
  requireAuth,
  [
    body('productId').not().isEmpty().withMessage('productId must be defined'),
    body('quantity').not().isEmpty().withMessage('quantity must be defined'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { productId, quantity } = req.body;
    const { id: userId } = req.currentUser!;
    const productItem = await Product.findById(productId);
    console.log(productItem);
    if (!productItem) {
      throw new NotFoundError();
    }

    let userCart = await ShopCart.findOne({
      userId: userId,
      orderId: '',
    }).populate('items.product');

    if (userCart) {
      const cartIndex = userCart.items.findIndex(
        (item) => item.product.id === productId
      );

      if (cartIndex > -1) {
        userCart.items[cartIndex].quantity = quantity;
      } else {
        userCart.items.push({
          product: productItem,
          quantity: quantity,
        });
      }
    } else {
      // Create a new shopCart
      userCart = ShopCart.build({
        userId: userId,
        orderId: '',
        items: [{ product: productItem, quantity: quantity }],
      });
    }
    await userCart.save();
    res.send(userCart);
  }
);

export { app as addShopCartRouter };
