import { Message } from 'node-nats-streaming';
import { Listener, Subjects, AddressUpdatedEvent } from '@blackteam/commonlib';
import { Address } from '../../models/address';
import { queueGroupName } from './queue-group-name';

export class AddressUpdatedListener extends Listener<AddressUpdatedEvent> {
  readonly subject = Subjects.AddressUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: AddressUpdatedEvent['data'], msg: Message) {
    const { id, name, country, township, version, address, deparment } = data;
    const addressUpdated = await Address.findOne({
      _id: id,
      version: version - 1,
    });
    if (!addressUpdated) {
      throw new Error('Address not found');
    }

    addressUpdated.set({
      name,
      country,
      township,
      address,
      deparment,
    });
    await addressUpdated.save();

    msg.ack();
  }
}
