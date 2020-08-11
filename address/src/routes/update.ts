import express, { Request, Response, text } from 'express';
import { body } from 'express-validator';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  NotAuthorizedError,
} from '@blackteam/commonlib';
import { Address } from '../models/address';

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
    const updateAdress = await Address.findById(req.params.addressId);

    if (!updateAdress) {
      throw new NotFoundError();
    }

    if (req.currentUser?.id !== updateAdress.userId) {
      throw new NotAuthorizedError();
    }

    updateAdress.set({
      address: req.body.address,
      country: req.body.country,
      deparment: req.body.deparment,
      township: req.body.township,
      position: req.body.position,
    });

    await updateAdress.save();

    res.send(updateAdress);
  }
);

export { route as updateAddressRouter };
