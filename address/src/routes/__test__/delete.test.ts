import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Address } from '../../models/address';

it('can only be accessed if the user is signed in', async () => {
  await request(app).delete('/api/address/asdfasdf').send({}).expect(401);
});

it('Delete an address', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const user = global.signin(id);

  const { body: address } = await request(app)
    .post('/api/address')
    .set('Cookie', user)
    .send({
      address: 'Loa Alamos',
      country: 'Guatemala',
      deparment: 'Guatemala',
      township: 'San Miguel Petapa',
      position: {
        long: '111111',
        lat: '12312323',
      },
    })
    .expect(201);

  await request(app)
    .delete(`/api/address/${address.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  const updatedAddress = await Address.findById(address.id);
  expect(updatedAddress!.status).toEqual(false);
});

it('return an error if an user try to delete an address that is not yours', async () => {
  const { body: address } = await request(app)
    .post('/api/address')
    .set('Cookie', global.signin())
    .send({
      address: 'Loa Alamos',
      country: 'Guatemala',
      deparment: 'Guatemala',
      township: 'San Miguel Petapa',
      position: {
        long: '111111',
        lat: '12312323',
      },
    })
    .expect(201);

  await request(app)
    .delete(`/api/address/${address.id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(401);
});

it('return an error if you try a delete an address that not exist', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .delete(`/api/address/${id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(404);
});
