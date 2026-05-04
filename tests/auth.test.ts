import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app';
import connectDB from '../src/config/database';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGO_URI = mongoUri;
  process.env.JWT_SECRET = 'test-secret';
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User registered successfully');
    expect(response.body.user).toHaveProperty('id');
    expect(response.body.user.name).toBe('Test User');
    expect(response.body.user.email).toBe('test@example.com');
  });

  it('should not register with existing email', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      });

    const response = await request(app)
      .post('/auth/register')
      .send({
        name: 'Another User',
        email: 'test@example.com',
        password: 'password456',
      });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('User already exists');
  });

  it('should login with correct credentials', async () => {
    await request(app)
      .post('/auth/register')
      .send({
        name: 'Test User',
        email: 'login@example.com',
        password: 'password123',
      });

    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'login@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.user).toHaveProperty('id');
  });

  it('should not login with wrong password', async () => {
    const response = await request(app)
      .post('/auth/login')
      .send({
        email: 'login@example.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });
});
