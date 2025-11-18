const request = require('supertest');
const express = require('express');

// small test app that mounts the real routes
const app = express();
app.use(express.json());
app.use('/api/auth', require('../routes/authRoutes'));

describe('Auth routes basic shape', function () {
  it('returns 400 when registering without body', async function () {
    const response = await request(app).post('/api/auth/register').send({});
    expect(response.status).toBe(400);
  });
});


