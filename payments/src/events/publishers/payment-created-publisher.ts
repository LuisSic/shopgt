import { PaymentCreatedEvent, Publisher, Subjects } from '@blackteam/commonlib';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
