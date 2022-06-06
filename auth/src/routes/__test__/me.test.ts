import request from 'supertest';
import { app } from '../../app';

it('responds with details about the current user', async () => {
    const cookie = await getAuthCookie();

    const response = await request(app)
        .get('/api/users/me')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    expect(response.body.me.email).toEqual('test@test.com');
});

it('responds with null if not authenticated', async () => {
    const response = await request(app)
        .get('/api/users/me')
        .send()
        .expect(200);

    expect(response.body.me).toEqual(null);
});
