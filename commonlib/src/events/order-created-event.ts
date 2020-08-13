import { Subjects } from './subjects';

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {};
}
