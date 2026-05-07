import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import cryptoRoutes from './routes/crypto';

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', "https://coinbase-selasie5.netlify.app/"],
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/crypto', cryptoRoutes);

export default app;
