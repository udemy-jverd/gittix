import { Request, Response, NextFunction } from 'express';
import { Unauthorized } from '../errors/unauthorized';

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.me) {
        throw new Unauthorized();
    }
    next();
}
