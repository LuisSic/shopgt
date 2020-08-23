import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/product').send({}).expect(401);
});

it('update a product with valid inputs', async () => {
  const newProductOne = Product.build({
    name: 'test',
    description: 'test',
    price: 200,
    imageUrl: 'sdfasdf',
    keyimage: 'test',
    status: true,
  });

  await newProductOne.save();

  const { body: product } = await request(app)
    .put(`/api/product/${newProductOne.id}`)
    .set('Cookie', global.signin())
    .send({
      name: 'test version2',
      description: 'test',
      price: 400,
      image: '',
      keyImage: '',
    })
    .expect(200);

  expect(product.price).toEqual(400);
  expect(product.keyimage).toEqual('test');
  expect(product.name).toEqual('test version2');
});

it('return an error with invalid inputs', async () => {
  const newProductOne = Product.build({
    name: 'test',
    description: 'test',
    price: 200,
    imageUrl: 'sdfasdf',
    keyimage: 'test',
    status: true,
  });

  await newProductOne.save();

  const { body: product } = await request(app)
    .put(`/api/product/${newProductOne.id}`)
    .set('Cookie', global.signin())
    .send({
      name: 'test version2',
      description: 'test',
      price: 20,
      image: 23,
    })
    .expect(400);
});
