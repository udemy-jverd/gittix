import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { meRouter } from './routes/me';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler, NotFoundError } from '@udemy-jverd/gittix-common';

const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
    // if we are in a test environment, allows Jest to set cookies even not using HTTPS
    cookieSession({ signed: false, secure: process.env.NODE_ENV !== 'test' })
);

app.use(meRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app }
