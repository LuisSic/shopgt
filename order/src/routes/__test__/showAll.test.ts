import request from 'supertest';
import { app } from '../../app';

it('can only be accessed if the user is signed in', async () => {
  await request(app).get('/api/order').send({}).expect(401);
});

it('get all orders the one user', async () => {
  const user = global.signin();
  await request(app)
    .post('/api/order')
    .set('Cookie', user)
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
      date: new Date().toISOString(),
    })
    .expect(201);

  await request(app)
    .post('/api/order')
    .set('Cookie', user)
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
      date: new Date().toISOString(),
    })
    .expect(201);

  const { body: orders } = await request(app)
    .get('/api/order')
    .set('Cookie', user)
    .expect(200);

  expect(orders.length).toEqual(2);
});
