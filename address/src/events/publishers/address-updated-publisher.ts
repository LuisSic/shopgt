import { Publisher, Subjects, AddressUpdatedEvent } from '@blackteam/commonlib';

export class AddressUpdatedPublisher extends Publisher<AddressUpdatedEvent> {
  readonly subject = Subjects.AddressUpdated;
}
