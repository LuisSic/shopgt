import { Message } from 'node-nats-streaming';
import {
  OrderCancelledEvent,
  Listener,
  Subjects,
  OrderStatus,
} from '@blackteam/commonlib';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/orders';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const { id, version } = data;
    const order = await Order.findOne({ _id: id, version: version - 1 });
    if (!order) {
      throw new Error('Order not found');
    }

    order.set({ status: OrderStatus.Cancelled });

    await order.save();

    msg.ack();
  }
}
