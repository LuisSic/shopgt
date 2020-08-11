import request from 'supertest';
import { app } from '../../app';

it('can only be accessed if the user is signed in', async () => {
  await request(app).get('/api/address').send({}).expect(401);
});

it('Fetch all addresses', async () => {
  const user = global.signin();
  await request(app)
    .post('/api/address')
    .set('Cookie', user)
    .send({
      address: 'Guatemala',
      country: 'Guatemala',
      deparment: 'Guatemala',
      township: 'Guatemala',
      position: {
        long: '111111',
        lat: '12312323',
      },
    })
    .expect(201);

  await request(app)
    .post('/api/address')
    .set('Cookie', user)
    .send({
      address: 'Guatemala',
      country: 'Guatemala',
      deparment: 'Guatemala',
      township: 'Guatemala',
      position: {
        long: '111111',
        lat: '12312323',
      },
    })
    .expect(201);

  const { body: address } = await request(app)
    .get('/api/address')
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(address.length).toEqual(2);
});

it('Fetch addresses without status false', async () => {
  const user = global.signin();
  const { body: addressOne } = await request(app)
    .post('/api/address')
    .set('Cookie', user)
    .send({
      address: 'Guatemala',
      country: 'Guatemala',
      deparment: 'Guatemala',
      township: 'Guatemala',
      position: {
        long: '111111',
        lat: '12312323',
      },
    })
    .expect(201);

  const { body: addressTwo } = await request(app)
    .post('/api/address')
    .set('Cookie', user)
    .send({
      address: 'Guatemala',
      country: 'Guatemala',
      deparment: 'Guatemala',
      township: 'Guatemala',
      position: {
        long: '111111',
        lat: '12312323',
      },
    })
    .expect(201);

  await request(app)
    .delete(`/api/address/${addressTwo.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  const { body: addresses } = await request(app)
    .get('/api/address')
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(addresses.length).toEqual(1);
  expect(addresses[0].id).toEqual(addressOne.id);
});
