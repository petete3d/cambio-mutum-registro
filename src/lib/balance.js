import binance from './binance';

export async function obtenerSaldoUSDT() {
  try {
    const cuenta = await binance.balance();
    const usdt = cuenta.USDT;
    return usdt ? usdt.available : '0.00';
  } catch (error) {
    console.error('❌ Error al obtener el saldo:', error.body || error);
    return 'Error';
  }
}
