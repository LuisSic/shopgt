import request from 'supertest';
import { app } from '../../app';

it('can only be accesses if the user is signed in', async () => {
  await request(app).get('/api/address/asdfasdf').send({}).expect(401);
});

it('Fetch addresses of one user', async () => {
  const user = global.signin();

  const { body: addressCreated } = await request(app)
    .post('/api/address')
    .set('Cookie', user)
    .send({
      address: 'Guatemala',
      country: 'Guatemala',
      deparment: 'Guatemala',
      township: 'Guatemala',
      long: 'asdfasdfdf',
      lat: 'asdfsdf',
    })
    .expect(201);

  const { body: addressesGot } = await request(app)
    .get(`/api/address/${addressCreated.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(addressCreated.id).toEqual(addressesGot.id);
});
