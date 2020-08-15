import { Subjects } from './subjects';
import { OrderStatus } from './Types/order-status';
export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled;
  data: {
    userId: string;
    total: number;
    id: string;
    version: number;
    status: OrderStatus;
  };
}
