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
      from: process.env.SENGRD_FROM!, // Use the email address or domain you verified above
      templateId: process.env.SENGRID_TEMPLATE!,
      dynamic_template_data: {
        name: 'There',
        orderId: orderId,
        Total: total,
        subject: 'Order receipt',
      },
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
