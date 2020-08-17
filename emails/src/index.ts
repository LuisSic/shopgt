import { natsWrapper } from './nats-wrapper';

const start = async () => {
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('BUCKET_NAME must be define');
  }

  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('BUCKET_NAME must be define');
  }

  if (!process.env.NATS_URL) {
    throw new Error('BUCKET_NAME must be define');
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
  } catch (err) {
    throw new Error(err);
  }
};

start();
