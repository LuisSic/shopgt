import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@blackteam/commonlib';
import { deleteProductRouter } from '../src/routes/delete';
import { createProductRouter } from '../src/routes/new';
import { getAllProductRouter } from '../src/routes/showAll';
import { getByIdProductRouter } from '../src/routes/showId';
import { updateProductRouter } from '../src/routes/update';

const app = express();

app.use(json());
app.set('trust proxy', true);
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(deleteProductRouter);
app.use(createProductRouter);
app.use(getAllProductRouter);
app.use(getByIdProductRouter);
app.use(updateProductRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
