import { natsWrapper } from './nats-wrapper';
import { PaymentCreatedListener } from '../src/events/listeners/payment-created-listener';
const start = async () => {
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be define');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be define');
  }

  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be define');
  }

  if (!process.env.SENGRD_FROM) {
    throw new Error('SENGRD_FROM must be define');
  }

  if (!process.env.SENGRID_TEMPLATE) {
    throw new Error('SENGRID_TEMPLATE must be define');
  }

  if (!process.env.SENGRID_API_KEY) {
    throw new Error('SENGRID_API_KEY must be define');
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );

    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });

    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());
    new PaymentCreatedListener(natsWrapper.client).listen();
  } catch (err) {
    throw new Error(err);
  }
};

start();
