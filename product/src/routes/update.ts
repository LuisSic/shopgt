import express, { Response, Request } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
} from '@blackteam/commonlib';
import { uploadToS3 } from '../services/uploads3';
import { Product } from '../models/product';
import { natsWrapper } from '../nats-wrapper';
import { ProductUpdatedPublisher } from '../events/publishers/product-updated-publisher';

const router = express.Router();

router.put(
  '/api/product/:productId',
  requireAuth,
  [
    body('name').not().isEmpty().withMessage('name is required'),
    body('description').not().isEmpty().withMessage('description is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
    body('image')
      .optional({ checkFalsy: true })
      .isString()
      .withMessage('image must be base64'),
    body('keyimage')
      .optional({ checkFalsy: true })
      .isString()
      .withMessage('keyimage must be string'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      throw new NotFoundError();
    }

    if (req.body.image && req.body.keyimage) {
      const data = await uploadToS3({
        name: req.body.keyimage,
        data: req.body.image,
      });
      product.set({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imageUrl: data.Location,
        keyimage: data.key,
        status: true,
      });
    } else {
      product.set({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        status: true,
      });
    }
    await product.save();
    new ProductUpdatedPublisher(natsWrapper.client).publish({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      keyimage: product.keyimage,
      version: product.version,
    });

    res.send(product);
  }
);

export { router as updateProductRouter };
