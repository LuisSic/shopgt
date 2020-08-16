import request from 'supertest';
import mongoose from 'mongoose';
import { app } from '../../app';
import { Product } from '../../models/product';
import { ShopCart } from '../../models/shopcar';

const buildProduct = async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const product = Product.build({
    id: id,
    name: 'test',
    price: 200,
    keyimage: 'test',
    imageUrl: 'https..',
  });

  await product.save();

  return product;
};

it('can only be accessed if the user is signed in', async () => {
  await request(app).post('/api/shopcart').send({}).expect(401);
});

it('return the currently shoping cart', async () => {
  const product = await buildProduct();
  const id = mongoose.Types.ObjectId().toHexString();
  const user = global.signin(id);

  const shopCart = ShopCart.build({
    userId: id,
    orderId: '1234',
    items: [{ product: product, quantity: 5 }],
  });

  const { body: currentlyCart } = await request(app)
    .post('/api/shopcart')
    .set('Cookie', user)
    .send({
      productId: product.id,
      quantity: 2,
    })
    .expect(201);

  const { body: shopingcart } = await request(app)
    .get('/api/shopcart')
    .set('Cookie', user)
    .send({})
    .expect(200);

  expect(shopingcart.id).toEqual(currentlyCart.id);
});
