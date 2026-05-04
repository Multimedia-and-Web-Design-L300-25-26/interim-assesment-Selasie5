import express from 'express';
import { getAllCryptos, getGainers, getNewListings, addCrypto } from '../controllers/cryptoController';
import { addCryptoValidation } from '../validation/cryptoValidation';

const router = express.Router();

router.get('/', getAllCryptos);
router.get('/gainers', getGainers);
router.get('/new', getNewListings);
router.post('/', addCryptoValidation, addCrypto);

export default router;
