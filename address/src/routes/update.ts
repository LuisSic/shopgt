import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
} from '@blackteam/commonlib';
import { Address } from '../models/address';
import { natsWrapper } from '../nats-wrapper';
import { AddressUpdatedPublisher } from '../events/publishers/address-updated-publisher';

const route = express.Router();

route.put(
  '/api/address/:addressId',
  requireAuth,
  [
    body('address').not().isEmpty().withMessage('Address is required'),
    body('country').not().isEmpty().withMessage('Country is required'),
    body('deparment').not().isEmpty().withMessage('Department is required'),
    body('township').not().isEmpty().withMessage('Township is required'),
    body('position.long').not().isEmpty().withMessage('longitude is required'),
    body('position.lat').not().isEmpty().withMessage('latitude is required'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const updatedAddress = await Address.findById(req.params.addressId);

    if (!updatedAddress) {
      throw new NotFoundError();
    }

    if (req.currentUser?.id !== updatedAddress.userId) {
      throw new NotAuthorizedError();
    }

    updatedAddress.set({
      address: req.body.address,
      country: req.body.country,
      deparment: req.body.deparment,
      township: req.body.township,
      position: req.body.position,
    });

    await updatedAddress.save();

    new AddressUpdatedPublisher(natsWrapper.client).publish({
      id: updatedAddress.id,
      name: updatedAddress.name,
      address: updatedAddress.address,
      country: updatedAddress.country,
      deparment: updatedAddress.deparment,
      township: updatedAddress.township,
      userId: updatedAddress.userId,
      version: updatedAddress.version,
    });

    res.send(updatedAddress);
  }
);

export { route as updateAddressRouter };
