import express from 'express';
import { currentUser } from '@udemy-jverd/gittix-common';

const router = express.Router();

router.get('/api/users/me', currentUser, (req, res) => {
    res.status(200).send({ me: req.me || null });
});

export { router as meRouter };
