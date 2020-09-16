import { Message } from 'node-nats-streaming';
import { Listener, Subjects, AddressCreatedEvent } from '@blackteam/commonlib';
import { Address } from '../../models/address';
import { queueGroupName } from './queue-group-name';

export class AddressCreatedListener extends Listener<AddressCreatedEvent> {
  readonly subject = Subjects.AddressCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: AddressCreatedEvent['data'], msg: Message) {
    const address = Address.build(data);

    await address.save();

    msg.ack();
  }
}
