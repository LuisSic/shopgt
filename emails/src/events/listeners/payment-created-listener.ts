import { Message } from 'node-nats-streaming';
import sgMail from '@sendgrid/mail';
import { PaymentCreatedEvent, Listener, Subjects } from '@blackteam/commonlib';
import { queueGroupName } from './queue-group-name';

sgMail.setApiKey(process.env.SENGRID_API_KEY!);
export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const { email, total, orderId } = data;
    const smgEmail = {
      to: email,
      from: 'noreplay@shopGT.com', // Use the email address or domain you verified above
      subject: `order receipt`,
      text: 'Thank you to shopping in our page',
      html: `<strong>Your order is ${orderId} order total: ${total}</strong>`,
    };

    try {
      await sgMail.send(smgEmail);
      msg.ack();
    } catch (err) {
      console.error(err);
      console.log(err.response.body);
    }
  }
}
