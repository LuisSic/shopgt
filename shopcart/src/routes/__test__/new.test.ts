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

it('return an error with invalid inputs', async () => {
  await request(app)
    .post('/api/shopcart')
    .set('Cookie', global.signin())
    .send({})
    .expect(400);
});

it('create a new shoping-cart with valid inputs', async () => {
  const product = await buildProduct();

  const { body: shopcart } = await request(app)
    .post('/api/shopcart')
    .set('Cookie', global.signin())
    .send({
      productId: product.id,
      quantity: 2,
    })
    .expect(200);

  expect(shopcart.items.length).toEqual(1);
});

it('add product to an existing shoping cart', async () => {
  const user = global.signin();
  const productOne = await buildProduct();

  const productTwo = await buildProduct();

  await productTwo.save();

  await request(app)
    .post('/api/shopcart')
    .set('Cookie', user)
    .send({
      productId: productOne.id,
      quantity: 2,
    })
    .expect(200);

  const { body: shopcart } = await request(app)
    .post('/api/shopcart')
    .set('Cookie', user)
    .send({
      productId: productTwo.id,
      quantity: 2,
    })
    .expect(200);

  expect(shopcart.items.length).toEqual(2);
});

it('replace an item if exist in the shoping cart', async () => {
  const user = global.signin();
  const productOne = await buildProduct();

  await request(app)
    .post('/api/shopcart')
    .set('Cookie', user)
    .send({
      productId: productOne.id,
      quantity: 2,
    })
    .expect(200);

  const { body: cart } = await request(app)
    .post('/api/shopcart')
    .set('Cookie', user)
    .send({
      productId: productOne.id,
      quantity: 5,
    })
    .expect(200);

  expect(cart.items.length).toEqual(1);
  expect(cart.items[0].quantity).toEqual(5);
});

it('create a new shop cart if the previous cart has a order Id', async () => {
  const userId = mongoose.Types.ObjectId().toHexString();
  const user = global.signin(userId);
  const productOne = await buildProduct();

  const shopCart = ShopCart.build({
    userId: userId,
    orderId: '1234',
    items: [{ product: productOne, quantity: 5 }],
  });

  await shopCart.save();

  const { body: newShopCart } = await request(app)
    .post('/api/shopcart')
    .set('Cookie', user)
    .send({
      productId: productOne.id,
      quantity: 2,
    })
    .expect(200);

  expect(newShopCart.id).not.toEqual(shopCart.id);
  expect(newShopCart.items[0].quantity).toEqual(2);
});
