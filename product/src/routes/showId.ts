import express, { Response, Request } from 'express';
import { Product } from '../models/product';
import { NotFoundError } from '@blackteam/commonlib';
const router = express.Router();

router.get('/api/product/:productId', async (req: Request, res: Response) => {
  const { productId } = req.params;

  const product = await Product.findById(productId);

  if (!product) {
    throw new NotFoundError();
  }

  res.send(product);
});

export { router as getByIdProductRouter };
