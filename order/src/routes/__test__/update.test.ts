import request from 'supertest';
import { app } from '../../app';
import { OrderStatus } from '@blackteam/commonlib';

it('can only be accessed if the user is signed in', async () => {
  await request(app).put('/api/order/3423423').send({}).expect(401);
});

it('Cancell an existing order', async () => {
  const user = global.signin();
  const { body: order } = await request(app)
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

  const { body: cancelledOrder } = await request(app)
    .put(`/api/order/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(cancelledOrder.status).toEqual(OrderStatus.Cancelled);
});
