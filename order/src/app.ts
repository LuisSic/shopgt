import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@blackteam/commonlib';
import { createOrderRouter } from '../src/routes/new';
import { getAllOrderRouter } from '../src/routes/showAll';
import { getOrderByIdRouter } from '../src/routes/showById';
import { updateOrderRouter } from '../src/routes/update';

const app = express();

app.use(json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(createOrderRouter);
app.use(getAllOrderRouter);
app.use(getOrderByIdRouter);
app.use(updateOrderRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
