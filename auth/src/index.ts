import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';

import { meRouter } from './routes/me';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const port = 3000;
const app = express();
app.use(json());

app.use(meRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async (req, res) => {
    throw new NotFoundError();
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})
