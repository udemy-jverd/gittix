import request from 'supertest';
import { app } from '../../app';

it('returns a 200 on successful signin', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123456789'
        })
        .expect(201);

    const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '123456789'
        })
        .expect(200);

    expect(response.get('Set-Cookie')).toBeDefined();
});

it('fails when an email that does not exist is supplied', async () => {
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '123456789'
        })
        .expect(400);
});

it('fails when an incorrect password is supplied', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: '123456789'
        })
        .expect(201);

    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'test@test.com',
            password: '12345678'
        })
        .expect(400);
});
