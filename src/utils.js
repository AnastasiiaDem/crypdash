export function percentDifference(a, b) {
    return Math.floor(100 * Math.abs((a - b) / ((a + b) / 2)));
}

export function formatNumberShort(num) {
    if (num >= 1.0e+12) {
      return (num / 1.0e+12).toFixed(1) + 'T';
    } else if (num >= 1.0e+9) {
      return (num / 1.0e+9).toFixed(1) + 'B';
    } else if (num >= 1.0e+6) {
      return (num / 1.0e+6).toFixed(1) + 'M';
    } else if (num >= 1.0e+3) {
      return (num / 1.0e+3).toFixed(1) + 'K';
    } else {
      return num.toFixed(2);
    }
  }


export function formatMoney(value) {
  if (typeof value !== 'number') {
    return 'Invalid input';
  }

  const formattedValue = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value);

  return formattedValue;
}