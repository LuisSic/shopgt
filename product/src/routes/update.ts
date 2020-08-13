import express, { Response, Request } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
} from '@blackteam/commonlib';
import { uploadToS3 } from '../services/uploads3';
import { Product } from '../models/product';

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
    body('image').not().isEmpty().withMessage('image in base 64 is required'),
    body('keyImage')
      .not()
      .isEmpty()
      .withMessage('name of the image is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      throw new NotFoundError();
    }

    if (product.keyimage !== req.body.keyImage) {
      const data = await uploadToS3({
        name: req.params.keyImage,
        data: req.params.image,
      });
      product.set({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imageUrl: data.Location,
        keyimage: data.key,
        status: true,
      });

      await product.save();
      res.send(product);
    }

    product.set({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      status: true,
    });
    await product.save();

    res.send(product);
  }
);

export { router as updateProductRouter };
