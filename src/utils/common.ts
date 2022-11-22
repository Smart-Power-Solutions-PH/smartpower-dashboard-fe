export const formatDecimal = (
  value: string | number,
  decimalPlaces = 2
): string =>
  value
    ? value.toLocaleString('en-US', {
        maximumFractionDigits: decimalPlaces,
        minimumFractionDigits: decimalPlaces,
      })
    : '';
