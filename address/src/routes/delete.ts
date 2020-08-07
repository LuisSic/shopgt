import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@blackteam/commonlib';
import { Address } from '../models/address';

const route = express.Router();

route.delete(
  '/api/address/:addressId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { addressId } = req.params;

    const address = await Address.findById(addressId);

    if (!address) {
      throw new NotFoundError();
    }

    if (address.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    address.status = false;
    await address.save();

    res.status(204).send({});
  }
);

export { route as deleteAddressRouter };
