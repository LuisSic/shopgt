import { Message } from 'node-nats-streaming';
import { Subjects, OrderCreatedEvent, Listener } from '@blackteam/commonlib';
import { ShopCart } from '../../models/shopcar';
import { queueGroupName } from './queue-gruoup-name';

export class OrderCreatedListenerEvent extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const { shopCartId } = data;
    const shopCart = await ShopCart.findById(shopCartId);

    if (!shopCart) {
      throw new Error('ShopCart not found');
    }

    shopCart.orderId = data.id;

    await shopCart.save();

    msg.ack();
  }
}
