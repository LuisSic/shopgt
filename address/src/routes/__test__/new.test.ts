import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Address } from '../../models/address';

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/address').send({}).expect(401);
});

it('returns a status other than 401 if the user is signed in', async () => {
  const response = await request(app)
    .post('/api/address')
    .set('Cookie', global.signin())
    .send({});

  expect(response.status).not.toEqual(401);
});

it('retuns an error if an invalid address is provided', async () => {
  await request(app)
    .post('/api/address')
    .set('Cookie', global.signin())
    .send({
      address: '',
      country: 'Guatemala',
      deparment: 'Guatemala',
      township: 'Guatemala',
      long: '1234324',
      lat: '12312323',
    })
    .expect(400);

  await request(app)
    .post('/api/address')
    .set('Cookie', global.signin())
    .send({
      country: 'Guatemala',
      deparment: 'Guatemala',
      township: 'Guatemala',
      long: '1234324',
      lat: '12312323',
    })
    .expect(400);
});

it('retuns an error if an invalid twonship is provided', async () => {
  await request(app)
    .post('/api/address')
    .set('Cookie', global.signin())
    .send({
      address: 'Guatemala',
      country: 'Guatemala',
      deparment: 'Guatemala',
      long: '1234324',
      lat: '12312323',
    })
    .expect(400);

  await request(app)
    .post('/api/address')
    .set('Cookie', global.signin())
    .send({
      address: 'asdfdsf',
      country: 'Guatemala',
      deparment: 'Guatemala',
      township: '',
      long: '1234324',
      lat: '12312323',
    })
    .expect(400);
});

it('retuns an error if an invalid long or lat are provided', async () => {
  await request(app)
    .post('/api/address')
    .set('Cookie', global.signin())
    .send({
      address: 'Guatemala',
      country: 'Guatemala',
      deparment: 'Guatemala',
      township: 'Guatemala',
      long: '',
      lat: '',
    })
    .expect(400);

  await request(app)
    .post('/api/address')
    .set('Cookie', global.signin())
    .send({
      address: 'Guatemala',
      country: 'Guatemala',
      deparment: 'Guatemala',
      township: 'Guatemala',
    })
    .expect(400);
});

it('create valid addresses with valid inputs', async () => {
  let addresses = await Address.find({});
  expect(addresses.length).toEqual(0);

  const id = mongoose.Types.ObjectId().toHexString();
  const { body: addressOne } = await request(app)
    .post('/api/address')
    .set('Cookie', global.signin(id))
    .send({
      address: 'Guatemala',
      country: 'Guatemala',
      deparment: 'Guatemala',
      township: 'Guatemala',
      long: '1231233123',
      lat: '123123123',
    })
    .expect(201);

  const { body: addresstwo } = await request(app)
    .post('/api/address')
    .set('Cookie', global.signin(id))
    .send({
      address: 'Guatemala',
      country: 'Guatemala',
      deparment: 'Guatemala',
      township: 'Guatemala',
      long: '123123123',
      lat: '123123123',
    })
    .expect(201);

  addresses = await Address.find({});
  expect(addresses.length).toEqual(2);
  expect(addresses[0].id).toEqual(addressOne.id);
  expect(addresses[1].id).toEqual(addresstwo.id);
});
