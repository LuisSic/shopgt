import { Message } from 'node-nats-streaming';
import {
  OrderCreatedEvent,
  Listener,
  Subjects,
  OrderStatus,
} from '@blackteam/commonlib';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/orders';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    const { id, version, userId, status, total } = data;
    const order = Order.build({
      id,
      version,
      userId,
      status,
      total,
    });

    await order.save();

    msg.ack();
  }
}
