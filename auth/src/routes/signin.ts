import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Password } from '../services/password';

const router = express.Router();

const reqValidation = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .trim()
        .notEmpty()
        .withMessage('You must supply a password')
]

router.post(
    '/api/users/signin',
    reqValidation,
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const currentUser = await User.findOne({ email });
        if (!currentUser) {
            throw new BadRequestError('Invalid credentials');
        }

        const passwordsMatch = await Password.compare(currentUser.password, password);
        if (!passwordsMatch) {
            throw new BadRequestError('Invalid credentials');
        }

        const userJwt = jwt.sign({
            id: currentUser.id,
            email: currentUser.email
        }, process.env.JWT_KEY!);
        req.session = { jwt: userJwt };
        res.status(200).send(currentUser);
});

export { router as signinRouter };
