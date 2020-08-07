import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@blackteam/commonlib';
import { Address } from '../models/address';

const route = express.Router();

route.post(
  '/api/address',
  requireAuth,
  [
    body('address').not().isEmpty().withMessage('Address is required'),
    body('country').not().isEmpty().withMessage('Country is required'),
    body('deparment').not().isEmpty().withMessage('Department is required'),
    body('township').not().isEmpty().withMessage('Township is required'),
    body('long').not().isEmpty().withMessage('longitude is required'),
    body('lat').not().isEmpty().withMessage('latitude is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { address, country, deparment, township, long, lat } = req.body;

    const newAddress = Address.build({
      address,
      country,
      deparment,
      township,
      long,
      lat,
      status: true,
      userId: req.currentUser!.id,
    });

    await newAddress.save();
    res.status(201).send(newAddress);
  }
);

export { route as newAddressRouter };
