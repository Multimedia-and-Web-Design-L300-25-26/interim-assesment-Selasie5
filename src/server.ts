import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/database';
import { seedDatabase } from './utils/seeder';

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
