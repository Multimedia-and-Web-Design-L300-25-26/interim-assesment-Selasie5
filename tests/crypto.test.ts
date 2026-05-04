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

  await request(app)
    .post('/crypto')
    .send({
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 50000,
      image: 'btc.png',
      change24h: 2.5,
    });

  await request(app)
    .post('/crypto')
    .send({
      name: 'Ethereum',
      symbol: 'ETH',
      price: 3000,
      image: 'eth.png',
      change24h: -1.2,
    });
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

describe('Crypto Endpoints', () => {
  it('should get all cryptos', async () => {
    const response = await request(app)
      .get('/crypto');

    expect(response.status).toBe(200);
    expect(response.body.cryptos).toHaveLength(2);
    expect(response.body.cryptos[0]).toHaveProperty('name');
    expect(response.body.cryptos[0]).toHaveProperty('symbol');
  });

  it('should get gainers sorted by change24h descending', async () => {
    const response = await request(app)
      .get('/crypto/gainers');

    expect(response.status).toBe(200);
    expect(response.body.cryptos[0].change24h).toBe(2.5);
    expect(response.body.cryptos[1].change24h).toBe(-1.2);
  });

  it('should get new listings sorted by createdAt descending', async () => {
    const response = await request(app)
      .get('/crypto/new');

    expect(response.status).toBe(200);
    expect(response.body.cryptos).toHaveLength(2);
  });

  it('should add a new crypto', async () => {
    const response = await request(app)
      .post('/crypto')
      .send({
        name: 'Litecoin',
        symbol: 'LTC',
        price: 150,
        image: 'ltc.png',
        change24h: 1.0,
      });

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Cryptocurrency added successfully');
    expect(response.body.crypto.name).toBe('Litecoin');
  });
});
