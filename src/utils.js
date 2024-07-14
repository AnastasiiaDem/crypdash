export function percentDifference(a, b) {
  const numA = +a;
  const numB = +b;

  if (numA === numB) {
    return 0;
  }

  const average = (numA + numB) / 2;
  const percentDiff = 100 * Math.abs(numA - numB) / average;

  return Math.floor(percentDiff);
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
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: value < 1 ? 8 : 2,
  }).format(+value);
}

export function precise(value) {
  return (+value).toFixed(value < 1 ? 8 : 2);
}