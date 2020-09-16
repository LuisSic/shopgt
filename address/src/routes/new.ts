import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@blackteam/commonlib';
import { Address } from '../models/address';
import { natsWrapper } from '../nats-wrapper';
import { AddressCreatedPublisher } from '../events/publishers/address-created-publisher';

const route = express.Router();

route.post(
  '/api/address',
  requireAuth,
  [
    body('name').not().isEmpty().withMessage('name of address is required'),
    body('address').not().isEmpty().withMessage('Address is required'),
    body('country').not().isEmpty().withMessage('Country is required'),
    body('deparment').not().isEmpty().withMessage('Department is required'),
    body('township').not().isEmpty().withMessage('Township is required'),
    body('position').not().isEmpty().withMessage('position is required'),
    body('position.lat').not().isEmpty().withMessage('lat is required'),
    body('position.long').not().isEmpty().withMessage('long is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { address, country, deparment, township, position, name } = req.body;

    const newAddress = Address.build({
      name,
      address,
      country,
      deparment,
      township,
      status: true,
      position,
      userId: req.currentUser!.id,
    });

    await newAddress.save();

    new AddressCreatedPublisher(natsWrapper.client).publish({
      id: newAddress.id,
      name: newAddress.name,
      address: newAddress.address,
      country: newAddress.country,
      deparment: newAddress.deparment,
      township: newAddress.township,
      userId: newAddress.userId,
    });

    res.status(201).send(newAddress);
  }
);

export { route as newAddressRouter };
