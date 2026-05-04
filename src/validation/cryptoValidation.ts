import { body } from 'express-validator';

export const addCryptoValidation = [
  body('name').trim().isLength({ min: 1 }).withMessage('Name is required'),
  body('symbol').trim().isLength({ min: 1 }).withMessage('Symbol is required'),
  body('price').isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('image').trim().isLength({ min: 1 }).withMessage('Image URL is required'),
  body('change24h').isFloat().withMessage('24h change must be a number'),
];
