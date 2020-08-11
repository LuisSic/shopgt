import express, { Response, Request } from 'express';
import { Product } from '../models/product';

const router = express.Router();

router.get('/api/product', async (req: Request, res: Response) => {
  const products = await Product.find({ status: true });
  res.send(products);
});

export { router as getAllProductRouter };
