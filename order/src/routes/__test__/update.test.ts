import request from 'supertest';
import { app } from '../../app';
import { OrderStatus } from '@blackteam/commonlib';
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
  await request(app).put('/api/order/3423423').send({}).expect(401);
});

it('Cancell an existing order', async () => {
  const address = await buildAddress();
  const user = global.signin();
  const { body: order } = await request(app)
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

  const { body: cancelledOrder } = await request(app)
    .put(`/api/order/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(cancelledOrder.status).toEqual(OrderStatus.Cancelled);
});
