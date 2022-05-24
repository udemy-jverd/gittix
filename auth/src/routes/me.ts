import express from 'express';
import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.get('/api/users/me', currentUser, (req, res) => {
    res.status(200).send({ me: req.me || null });
});

export { router as meRouter };
