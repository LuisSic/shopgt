import request from 'supertest';
import { app } from '../../app';

it('can only be accessed if the user is signed in', async () => {
  await request(app).get('/api/order/r23423fsdf').send({}).expect(401);
});

it('get order by ID', async () => {
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
      shopCart: [{ product: 'Pulsera x', quantity: 20 }],
    })
    .expect(201);

  const { body: orderTwo } = await request(app)
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
      shopCart: [{ product: 'Pulsera x', quantity: 20 }],
    })
    .expect(201);

  const { body: order } = await request(app)
    .get(`/api/order/${orderTwo.id}`)
    .set('Cookie', user)
    .expect(200);

  expect(order.id).toEqual(orderTwo.id);
});
