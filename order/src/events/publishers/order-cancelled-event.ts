import { OrderCancelledEvent, Publisher, Subjects } from '@blackteam/commonlib';

export class OrderCancelledPublisherEvent extends Publisher<
  OrderCancelledEvent
> {
  readonly subject = Subjects.OrderCancelled;
}
