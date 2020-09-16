import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose';
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
  await request(app).get('/api/order').send({}).expect(401);
});

it('get all orders the one user', async () => {
  const address = await buildAddress();
  const user = global.signin();
  await request(app)
    .post('/api/order')
    .set('Cookie', user)
    .send({
      total: 20,
      addressId: address.id,
      shopCartId: '21321445',
      shopCart: [{ product: 'Pulsera x', quantity: 20 }],
      date: new Date().toISOString(),
    })
    .expect(201);

  await request(app)
    .post('/api/order')
    .set('Cookie', user)
    .send({
      total: 20,
      addressId: address.id,
      shopCartId: '21321445',
      shopCart: [{ product: 'Pulsera x', quantity: 20 }],
      date: new Date().toISOString(),
    })
    .expect(201);

  const { body: orders } = await request(app)
    .get('/api/order')
    .set('Cookie', user)
    .expect(200);

  expect(orders.length).toEqual(2);
});
