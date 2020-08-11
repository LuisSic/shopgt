import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';

it('get product by Id', async () => {
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
    .get(`/api/product/${newProductOne.id}`)
    .send({})
    .expect(200);

  expect(product.id).toEqual(newProductOne.id);
});

it('return an error if you provide a product Id that not exist', async () => {
  const id = mongoose.Types.ObjectId().toHexString();

  const newProductOne = Product.build({
    name: 'test',
    description: 'test',
    price: 200,
    imageUrl: 'sdfasdf',
    keyimage: 'test',
    status: true,
  });

  await newProductOne.save();

  await request(app).get(`/api/product/${id}`).send({}).expect(404);
});
