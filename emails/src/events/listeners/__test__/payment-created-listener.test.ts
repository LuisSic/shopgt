import { Message } from 'node-nats-streaming';
import { PaymentCreatedEvent, Listener, Subjects } from '@blackteam/commonlib';
import { PaymentCreatedListener } from '../payment-created-listener';
import { natsWrapper } from '../../../nats-wrapper';

const setup = async () => {
  // create an instance of listener
  const listener = new PaymentCreatedListener(natsWrapper.client);
  // create a fake data event
  const data: PaymentCreatedEvent['data'] = {
    id: 'sdfasdfasd3423423',
    total: 10,
    orderId: '324234324',
    stripeId: 'asdfasdfasdf',
    email: 'lantoni24@hotmail.com',
  };
  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('send the email to user', async () => {
  const { listener, data, msg } = await setup();
  // cal the onmessage function with the data object + message object
  await listener.onMessage(data, msg);
  // write assestions to make sure a ticket was created!
  expect(msg.ack).toHaveBeenCalled();
});
