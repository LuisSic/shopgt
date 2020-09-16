import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Address } from '../../models/address';

const buildAddress = async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const address = Address.build({
    id: id,
    name: 'My Home',
    address: '5ta av. 1-86 zona 11',
    country: 'Guatemala',
    deparment: 'Guatemala',
    township: 'San Miguel Petapa',
    userId: id,
  });

  await address.save();

  return address;
};

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/order').send({}).expect(401);
});

it('return an error with invalid total in the order', async () => {
  const address = await buildAddress();
  const { body } = await request(app)
    .post('/api/order')
    .set('Cookie', global.signin())
    .send({
      total: '',
      addressId: address.id,
      shopCartId: '21321445',
      shopCart: [
        {
          product: '23423sdfd',
          quantity: 2,
        },
      ],
    })
    .expect(400);
});

it('return an error with invalid addressId in the order', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const { body } = await request(app)
    .post('/api/order')
    .set('Cookie', global.signin())
    .send({
      total: 20,
      addressId: id,
      shopCartId: '21321445',
      shopCart: [
        {
          product: '23423sdfd',
          quantity: 2,
        },
      ],
    })
    .expect(400);
});

it('return an error with invalid shopCart in the order', async () => {
  const address = await buildAddress();
  const { body } = await request(app)
    .post('/api/order')
    .set('Cookie', global.signin())
    .send({
      total: 20,
      addressId: address.id,
      shopCartId: '21321445',
      shopCart: [{ product: '', quantity: '' }],
    })
    .expect(400);
});

it('create an order with valid inputs', async () => {
  const address = await buildAddress();
  const { body } = await request(app)
    .post('/api/order')
    .set('Cookie', global.signin())
    .send({
      total: 20,
      addressId: address.id,
      shopCartId: '21321445',
      shopCart: [{ product: 'Pulsera x', quantity: 20 }],
      date: new Date().toISOString(),
    })
    .expect(201);
});
