import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cors from 'cors';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError } from '@blackteam/commonlib';
import { newAddressRouter } from '../src/routes/new';
import { deleteAddressRouter } from '../src/routes/delete';
import { getAddressRouter } from '../src/routes/show';
import { getAllAddressRouter } from '../src/routes/showall';
import { updateAddressRouter } from '../src/routes/update';
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

app.use(newAddressRouter);
app.use(deleteAddressRouter);
app.use(getAddressRouter);
app.use(getAllAddressRouter);
app.use(updateAddressRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
