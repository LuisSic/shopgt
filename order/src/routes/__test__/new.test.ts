import request from 'supertest';
import { app } from '../../app';

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/order').send({}).expect(401);
});

it('return an error with invalid total in the order', async () => {
  const { body } = await request(app)
    .post('/api/order')
    .set('Cookie', global.signin())
    .send({
      total: '',
      homeAddress: {
        address: 'Guatemala',
        country: 'Guatemala',
        deparment: 'Guatemala',
        township: 'Guatemala',
        position: {
          long: '111111',
          lat: '12312323',
        },
      },
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

it('return an error with invalid homeAddress in the order', async () => {
  const { body } = await request(app)
    .post('/api/order')
    .set('Cookie', global.signin())
    .send({
      total: 20,
      homeAddress: {},
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
  const { body } = await request(app)
    .post('/api/order')
    .set('Cookie', global.signin())
    .send({
      total: 20,
      homeAddress: {
        address: 'Guatemala',
        country: 'Guatemala',
        deparment: 'Guatemala',
        township: 'Guatemala',
        position: {
          long: '111111',
          lat: '12312323',
        },
      },
      shopCartId: '21321445',
      shopCart: [{ product: '', quantity: '' }],
    })
    .expect(400);
});

it('create an order with valid inputs', async () => {
  await request(app)
    .post('/api/order')
    .set('Cookie', global.signin())
    .send({
      total: 20,
      homeAddress: {
        address: 'Guatemala',
        country: 'Guatemala',
        deparment: 'Guatemala',
        township: 'Guatemala',
        position: {
          long: '111111',
          lat: '12312323',
        },
      },
      shopCartId: '21321445',
      shopCart: [{ product: 'Pulsera x', quantity: 20 }],
    })
    .expect(201);
});
