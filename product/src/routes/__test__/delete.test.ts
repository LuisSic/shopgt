import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Product } from '../../models/product';

it('can only be accessed if the user is signed in', async () => {
  await request(app).delete('/api/product/213123123').send({}).expect(401);
});

it('Delete a product', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const user = global.signin(id);

  const newProduct = Product.build({
    name: 'test',
    description: 'test',
    price: 200,
    imageUrl: 'sdfasdf',
    keyimage: 'test',
    status: true,
  });

  await newProduct.save();

  await request(app)
    .delete(`/api/product/${newProduct.id}`)
    .set('Cookie', user)
    .send()
    .expect(204);

  const deletedProduct = await Product.findById(newProduct.id);
  expect(deletedProduct!.status).toEqual(false);
});

it('return an error if an user try to delete a product that not exist', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const newProduct = Product.build({
    name: 'test',
    description: 'test',
    price: 200,
    imageUrl: 'sdfasdf',
    keyimage: 'test',
    status: true,
  });

  await newProduct.save();

  await request(app)
    .delete(`/api/address/${id}`)
    .set('Cookie', global.signin())
    .send()
    .expect(404);
});
