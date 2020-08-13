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

it('return an error if you send a shoping-cart Id that not exist', async () => {
  const shopCartId = mongoose.Types.ObjectId().toHexString();
  await request(app)
    .post(`/api/shopcart/${shopCartId}`)
    .set('Cookie', global.signin())
    .send({
      productId: '324234asdfasdf',
    })
    .expect(404);
});

it('return an error if you try to delete an item of a shoping cart that is not yours', async () => {
  const product = await buildProduct();

  const { body: shopcart } = await request(app)
    .post('/api/shopcart')
    .set('Cookie', global.signin())
    .send({
      productId: product.id,
      quantity: 2,
    })
    .expect(200);

  await request(app)
    .delete(`/api/shopcart/${shopcart.id}`)
    .set('Cookie', global.signin())
    .send({
      productId: product.id,
    })
    .expect(401);
});

it('return an error if you try to delete an item of a shoping cart that not exist', async () => {
  const id = mongoose.Types.ObjectId().toHexString();
  const product = await buildProduct();
  const user = global.signin();

  const { body: shopcart } = await request(app)
    .post('/api/shopcart')
    .set('Cookie', user)
    .send({
      productId: product.id,
      quantity: 2,
    })
    .expect(200);

  await request(app)
    .delete(`/api/shopcart/${shopcart.id}`)
    .set('Cookie', user)
    .send({
      productId: id,
    })
    .expect(404);
});

it('delete a valid item of your shoping cart', async () => {
  const product = await buildProduct();
  const user = global.signin();

  const { body: shopcart } = await request(app)
    .post('/api/shopcart')
    .set('Cookie', user)
    .send({
      productId: product.id,
      quantity: 2,
    })
    .expect(200);

  await request(app)
    .delete(`/api/shopcart/${shopcart.id}`)
    .set('Cookie', user)
    .send({
      productId: product.id,
    })
    .expect(204);

  const userCart = await ShopCart.findById(shopcart.id).populate(
    'items.product'
  );

  expect(userCart!.items.length).toEqual(0);
});
