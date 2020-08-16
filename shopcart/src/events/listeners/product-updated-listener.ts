import { Message } from 'node-nats-streaming';
import { Subjects, Listener, ProductUpdatedEvent } from '@blackteam/commonlib';
import { Product } from '../../models/product';
import { queueGroupName } from './queue-gruoup-name';

export class ProductUpdatedListenerEvent extends Listener<ProductUpdatedEvent> {
  readonly subject = Subjects.ProductUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductUpdatedEvent['data'], msg: Message) {
    const { id, name, price, keyimage, imageUrl } = data;

    const product = await Product.findByEvent(data);

    if (!product) {
      throw new Error('product not found');
    }

    product.set({
      name,
      price,
      keyimage,
      imageUrl,
    });

    await product.save();

    msg.ack();
  }
}
