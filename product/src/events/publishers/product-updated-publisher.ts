import { Publisher, Subjects, ProductUpdatedEvent } from '@blackteam/commonlib';

export class ProductUpdatedPublisher extends Publisher<ProductUpdatedEvent> {
  readonly subject = Subjects.ProductUpdated;
}
