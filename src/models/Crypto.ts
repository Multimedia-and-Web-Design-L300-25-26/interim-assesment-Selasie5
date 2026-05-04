import mongoose, { Document, Schema } from 'mongoose';

export interface ICrypto extends Document {
  name: string;
  symbol: string;
  price: number;
  image: string;
  change24h: number;
  createdAt: Date;
}

const cryptoSchema: Schema<ICrypto> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  symbol: {
    type: String,
    required: true,
    uppercase: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  image: {
    type: String,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<ICrypto>('Crypto', cryptoSchema);
