import express, { Request, Response } from 'express';
import { requireAuth } from '@blackteam/commonlib';
import { ShopCart } from '../models/shopcar';

const app = express.Router();

app.get('/api/shopcart', requireAuth, async (req: Request, res: Response) => {
  const userCart = await ShopCart.findOne({
    userId: req.currentUser!.id,
    orderId: '',
  }).populate('items.product');

  res.send(userCart);
});

export { app as showShopCartRouter };
