const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  RUB: '₽',
  JPY: '¥',
  CNY: '¥',
  CAD: '$',
};

export function getCurrencySymbol(currency: string): string {
  return CURRENCY_SYMBOLS[currency] || currency;
}

export function formatPrice(price: number, currency: string): string {
  const symbol = getCurrencySymbol(currency);
  return `${symbol}${price.toFixed(2)}`;
}
