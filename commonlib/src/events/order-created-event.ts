import { Subjects } from './subjects';
import { OrderStatus } from './Types/order-status';

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    userId: string;
    total: number;
    id: string;
    version: number;
    status: OrderStatus;
  };
}
