import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import connectDB from '../src/config/database';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;
const agent = request.agent(app);

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGO_URI = mongoUri;
  process.env.JWT_SECRET = 'test-secret';
  await connectDB();

  await agent
    .post('/auth/register')
    .send({
      name: 'Profile User',
      email: 'profile@example.com',
      password: 'password123',
    });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('User Profile Endpoint', () => {
  it('should get user profile with valid token', async () => {
    const response = await agent
      .get('/user/profile');

    expect(response.status).toBe(200);
    expect(response.body.user).toHaveProperty('name', 'Profile User');
    expect(response.body.user).toHaveProperty('email', 'profile@example.com');
    expect(response.body.user).not.toHaveProperty('password');
  });

  it('should not get profile without token', async () => {
    const response = await request(app)
      .get('/user/profile');

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Access denied. No token provided.');
  });
});
