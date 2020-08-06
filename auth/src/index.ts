import mongoose from 'mongoose';
import { app } from './app';

const start = async () => {
  if (!process.env.MONGO_URL) {
    console.log('MONGO_URL');
    throw new Error('MONGO_URL must be defined');
  }

  if (!process.env.FACEBOOK_CLIENT_ID) {
    console.log('FACEBOOK_CLIENT_ID');
    throw new Error('FACEBOOK_CLIENT_ID must be defined');
  }

  if (!process.env.FACEBOOK_CLIENT_SECRET) {
    console.log('FACEBOOK_CLIENT_SECRET');
    throw new Error('FACEBOOK_CLIENT_SECRET must be defined');
  }

  if (!process.env.FACEBOOK_CALLBACK_URL) {
    console.log('FACEBOOK_CALLBACK_URL');
    throw new Error('FACEBOOK_CALLBACK_URL must be defined');
  }

  if (!process.env.JWT_KEY) {
    console.log('JWT_KEY');
    throw new Error('JWT_KEY must be defined');
  }

  if (!process.env.GOOGLE_CLIENT_ID) {
    console.log('GOOGLE_CLIENT_ID');
    throw new Error('GOOGLE_CLIENT_ID must be defined');
  }

  if (!process.env.GOOGLE_CLIENT_SECRET) {
    console.log('GOOGLE_CLIENT_SECRET');
    throw new Error('GOOGLE_CLIENT_SECRET must be defined');
  }

  if (!process.env.GOOGLE_CALLBACK_URL) {
    console.log('GOOGLE_CALLBACK_URL');
    throw new Error('JWT_KEY must be defined');
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('connected to Mongodb');
  } catch (err) {
    console.log(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!');
  });
};

start();
