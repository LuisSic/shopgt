import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@blackteam/commonlib';
import { addShopCartRouter } from './routes/new';
import { showShopCartRouter } from './routes/show';
import { deleteItemShopCartRouter } from './routes/delete';

const app = express();

app.use(json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(addShopCartRouter);
app.use(showShopCartRouter);
app.use(deleteItemShopCartRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
