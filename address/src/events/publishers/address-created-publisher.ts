import { Publisher, Subjects, AddressCreatedEvent } from '@blackteam/commonlib';

export class AddressCreatedPublisher extends Publisher<AddressCreatedEvent> {
  readonly subject = Subjects.AddressCreated;
}
