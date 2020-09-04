import { Message } from 'node-nats-streaming';
import { Subjects, Listener, ProductCreatedEvent } from '@blackteam/commonlib';
import { Product } from '../../models/product';
import { queueGroupName } from './queue-gruoup-name';

export class ProductCreatedListener extends Listener<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: ProductCreatedEvent['data'], msg: Message) {
    const { id, name, price, keyimage, imageUrl } = data;
    const product = Product.build({
      id,
      name,
      price,
      keyimage,
      imageUrl,
    });

    await product.save();

    msg.ack();
  }
}
