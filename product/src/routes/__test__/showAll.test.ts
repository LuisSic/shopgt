import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';

it('get all the products', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const user = global.signin(id);

  const newProductOne = Product.build({
    name: 'test',
    description: 'test',
    price: 200,
    imageUrl: 'sdfasdf',
    keyimage: 'test',
    status: true,
  });

  await newProductOne.save();

  const newProductTwo = Product.build({
    name: 'test',
    description: 'test',
    price: 200,
    imageUrl: 'sdfasdf',
    keyimage: 'test',
    status: true,
  });

  await newProductTwo.save();

  const { body: allProducts } = await request(app)
    .get('/api/product')
    .send({})
    .expect(200);

  expect(allProducts.length).toEqual(2);
});
