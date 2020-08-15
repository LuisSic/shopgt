import { Publisher, Subjects, ProductCreatedEvent } from '@blackteam/commonlib';

export class ProductCreatedPublisher extends Publisher<ProductCreatedEvent> {
  readonly subject = Subjects.ProductCreated;
}
