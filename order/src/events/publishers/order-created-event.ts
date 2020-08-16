import { OrderCreatedEvent, Publisher, Subjects } from '@blackteam/commonlib';

export class OrderCreatedPublisherEvent extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
