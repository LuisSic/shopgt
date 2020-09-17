import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import cors from 'cors';
import { errorHandler, NotFoundError } from '@blackteam/commonlib';
import { createdChargeRouter } from '../src/routes/new';
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
app.use(createdChargeRouter);
app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
