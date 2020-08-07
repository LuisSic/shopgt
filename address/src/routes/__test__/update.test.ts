import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';

it('can only be accessed if the user is signed in', async () => {
  await request(app).put('/api/address/123123231').send({}).expect(401);
});

it('Update address with valid inputs', async () => {
  const user = global.signin();
  const { body: address } = await request(app)
    .post('/api/address')
    .set('Cookie', user)
    .send({
      address: 'Guatemala',
      country: 'Guatemala',
      deparment: 'Guatemala',
      township: 'Guatemala',
      long: '1234324',
      lat: '12312323',
    })
    .expect(201);

  await request(app)
    .put(`/api/address/${address.id}`)
    .set('Cookie', user)
    .send({
      address: 'Guatemala',
      country: 'Guatemala',
      deparment: 'Quiche',
      township: 'San Pedro Jocopilas',
      long: '111111',
      lat: '12312323',
    })
    .expect(200);

  const { body: fetchAddress } = await request(app)
    .get(`/api/address/${address.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(fetchAddress.deparment).toEqual('Quiche');
  expect(fetchAddress.long).toEqual('111111');
});

it('return error if we provied id does not exist', async () => {
  const user = global.signin();
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .post('/api/address')
    .set('Cookie', user)
    .send({
      address: 'Guatemala',
      country: 'Guatemala',
      deparment: 'Guatemala',
      township: 'Guatemala',
      long: '1234324',
      lat: '12312323',
    })
    .expect(201);

  await request(app)
    .put(`/api/address/${id}`)
    .set('Cookie', user)
    .send({
      address: 'Guatemala',
      country: 'Guatemala',
      deparment: 'Quiche',
      township: 'San Pedro Jocopilas',
      long: '111111',
      lat: '12312323',
    })
    .expect(404);
});
