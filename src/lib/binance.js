import Binance from 'node-binance-api';

const binance = new Binance().options({
  APIKEY: import.meta.env.VITE_BINANCE_API_KEY,
  APISECRET: import.meta.env.VITE_BINANCE_API_SECRET
});

export default binance;
