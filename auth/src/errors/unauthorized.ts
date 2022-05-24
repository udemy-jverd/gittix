import { CustomError } from './custom-error';

export class Unauthorized extends CustomError {

    statusCode = 401;

    constructor() {
        super('Unauthorized');
        Object.setPrototypeOf(this, Unauthorized.prototype);
    }

    serializeErrors() {
        return [{ message: 'Unauthorized' }];
    }
}
