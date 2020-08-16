import express, { Response, Request } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@blackteam/commonlib';
import { Product } from '../models/product';
import { uploadToS3 } from '../services/uploads3';
import { natsWrapper } from '../nats-wrapper';
import { ProductCreatedPublisher } from '../events/publishers/product-created-publisher';

const router = express.Router();

router.post(
  '/api/product',
  requireAuth,
  [
    body('name').not().isEmpty().withMessage('name is required'),
    body('description').not().isEmpty().withMessage('description is required'),
    body('price')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
    body('image').not().isEmpty().withMessage('name is required'),
    body('nameImage')
      .not()
      .isEmpty()
      .withMessage('name of the image is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const data = await uploadToS3({
      name: req.body.nameImage,
      data: req.body.image,
    });

    const newProduct = Product.build({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrl: data.Location,
      keyimage: data.key,
      status: true,
    });

    await newProduct.save();

    new ProductCreatedPublisher(natsWrapper.client).publish({
      id: newProduct.id,
      name: newProduct.name,
      keyimage: newProduct.keyimage,
      imageUrl: newProduct.imageUrl,
      version: newProduct.version,
      price: newProduct.price,
    });

    res.status(201).send(newProduct);
  }
);

export { router as createProductRouter };
