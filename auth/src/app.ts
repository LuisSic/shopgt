import express from 'express';
import { json } from 'body-parser';
import passport from 'passport';
import cookieSession from 'cookie-session';

import { siginRouter } from './routes/signin';
const app = express();
app.use(json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(passport.initialize());

app.use(siginRouter);

export { app };
