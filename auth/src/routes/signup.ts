import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import jwt from 'jsonwebtoken';

const router = express.Router();

const reqValidation = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid.'),
    body('password')
        .trim()
        .isLength({ min: 8, max: 64})
        .withMessage('Password must be between 8 and 64 characters.')
];

router.post(
    '/api/users/signup',
    reqValidation,
    validateRequest,
    async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new BadRequestError('Email already in use');
        }

        const user = User.build({ email, password });
        await user.save();

        const userJwt = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.JWT_KEY!);

        // decode the cookie: https://www.base64decode.org
        // decode the JWT inside the cookie: https://jwt.io
        req.session = { jwt: userJwt };
        res.status(201).send(user);
});

export { router as signupRouter };
