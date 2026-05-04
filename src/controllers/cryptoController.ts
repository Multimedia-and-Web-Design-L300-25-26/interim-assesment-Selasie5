import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import Crypto, { ICrypto } from '../models/Crypto';

export const getAllCryptos = async (req: Request, res: Response): Promise<void> => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    res.json({ cryptos });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getGainers = async (req: Request, res: Response): Promise<void> => {
  try {
    const gainers = await Crypto.find().sort({ change24h: -1 });
    res.json({ cryptos: gainers });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getNewListings = async (req: Request, res: Response): Promise<void> => {
  try {
    const newListings = await Crypto.find().sort({ createdAt: -1 });
    res.json({ cryptos: newListings });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addCrypto = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  try {
    const { name, symbol, price, image, change24h } = req.body;
    const crypto: ICrypto = new Crypto({ name, symbol, price, image, change24h });
    await crypto.save();
    res.status(201).json({ message: 'Cryptocurrency added successfully', crypto });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
