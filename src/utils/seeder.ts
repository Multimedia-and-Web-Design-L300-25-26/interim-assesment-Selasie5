import Crypto from '../models/Crypto';

const initialCoins = [
  { name: 'Bitcoin', symbol: 'BTC', price: 65000, image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png', change24h: 1.2 },
  { name: 'Ethereum', symbol: 'ETH', price: 3500, image: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png', change24h: 2.5 },
  { name: 'Solana', symbol: 'SOL', price: 145, image: 'https://assets.coingecko.com/coins/images/4128/large/solana.png', change24h: 5.8 },
  { name: 'Cardano', symbol: 'ADA', price: 0.45, image: 'https://assets.coingecko.com/coins/images/975/large/cardano.png', change24h: -0.5 },
  { name: 'Polkadot', symbol: 'DOT', price: 7.2, image: 'https://assets.coingecko.com/coins/images/12171/large/polkadot.png', change24h: 3.1 },
  { name: 'XRP', symbol: 'XRP', price: 0.62, image: 'https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png', change24h: 0.8 },
  { name: 'Dogecoin', symbol: 'DOGE', price: 0.16, image: 'https://assets.coingecko.com/coins/images/5/large/dogecoin.png', change24h: 12.4 },
  { name: 'Shiba Inu', symbol: 'SHIB', price: 0.000027, image: 'https://assets.coingecko.com/coins/images/11939/large/shiba.png', change24h: -2.1 },
  { name: 'Avalanche', symbol: 'AVAX', price: 48, image: 'https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png', change24h: 4.2 },
  { name: 'Chainlink', symbol: 'LINK', price: 18, image: 'https://assets.coingecko.com/coins/images/877/large/chainlink-new-logo.png', change24h: 1.5 },
];

export const seedDatabase = async () => {
  try {
    for (const coin of initialCoins) {
      const exists = await Crypto.findOne({ symbol: coin.symbol });
      if (!exists) {
        console.log(`Seeding ${coin.name}...`);
        await Crypto.create(coin);
      }
    }
    console.log('Database seeding check complete.');
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};
