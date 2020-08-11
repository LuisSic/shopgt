import { Product } from '../product';

it('implements optimistic concurrency control', async (done) => {
  const product = Product.build({
    name: 'test',
    description: 'test',
    price: 200,
    imageUrl: 'sdfasdf',
    keyimage: 'test',
    status: true,
  });

  await product.save();

  const firstInstance = await Product.findById(product.id);
  const secondInstance = await Product.findById(product.id);

  firstInstance!.set({ price: 210 });
  secondInstance!.set({ price: 215 });

  await firstInstance!.save();

  try {
    await secondInstance!.save();
  } catch (err) {
    return done();
  }

  throw new Error('should not reach this point');
});

it('increments the version number on multiple saves', async () => {
  const product = Product.build({
    name: 'test',
    description: 'test',
    price: 200,
    imageUrl: 'sdfasdf',
    keyimage: 'test',
    status: true,
  });

  await product.save();
  expect(product.version).toEqual(0);
  await product.save();
  expect(product.version).toEqual(1);
  await product.save();
  expect(product.version).toEqual(2);
});
