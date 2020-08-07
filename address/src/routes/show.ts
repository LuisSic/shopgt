import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotAuthorizedError,
  NotFoundError,
} from '@blackteam/commonlib';
import { Address } from '../models/address';
const route = express.Router();

route.get(
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

    res.send(address);
  }
);

export { route as getAddressRouter };
