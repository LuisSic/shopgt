import express, { Response, Request } from 'express';
import {
  NotFoundError,
  NotAuthorizedError,
  requireAuth,
} from '@blackteam/commonlib';
import { Product } from '../models/product';
const router = express.Router();

router.delete(
  '/api/product/:productId',
  requireAuth,
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      throw new NotFoundError();
    }

    product.status = false;
    await product.save();

    res.status(204).send({});
  }
);

export { router as deleteProductRouter };
