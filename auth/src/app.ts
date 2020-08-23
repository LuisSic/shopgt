import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import passport from 'passport';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@blackteam/commonlib';
import { siginRouter } from './routes/signin';
import { signOutRouter } from './routes/signout';
import { currentUserRouter } from './routes/current-user';
import cors from 'cors';

const app = express();
app.use(json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(passport.initialize());

app.use(siginRouter);
app.use(currentUserRouter);
app.use(signOutRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
