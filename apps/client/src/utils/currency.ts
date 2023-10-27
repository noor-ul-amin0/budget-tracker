export function formatAsCurrency(amount: number, currencyCode = 'PKR') {
  try {
    const maximumFractionDigits = currencyCode === 'PKR' ? 0 : 2; // Set to 0 for PKR, 2 for others
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      maximumFractionDigits: maximumFractionDigits,
    }).format(amount);
  } catch (error) {
    console.error('Currency formatting failed:', error);
    return null;
  }
}
