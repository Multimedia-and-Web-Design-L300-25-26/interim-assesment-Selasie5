import express from 'express';
import { register, login, logout } from '../controllers/authController';
import { registerValidation, loginValidation } from '../validation/authValidation';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.post('/logout', logout);

export default router;
