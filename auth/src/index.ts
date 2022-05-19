import express from 'express';
import { json } from 'body-parser';

const port = 3000;
const app = express();
app.use(json());

app.get('/api/users/me', (req, res) => {
    res.status(200).send('Hi there!');
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})
