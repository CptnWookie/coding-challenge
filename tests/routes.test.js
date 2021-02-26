const request = require('supertest');
const app = require('../server');

describe('Get Endpoints', () => {
  it('should create a new get', async () => {
    const res = await request(app)
      .get('/ninjify')
      .send({
        userId: 1,
        title: 'test is cool',
      })
    expect(res.statusCode).toEqual(201)
    expect(res.body).toHaveProperty('get')
  })
})