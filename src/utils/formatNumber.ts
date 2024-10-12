const formatNumber = (number: number): string => {
  if (typeof number !== 'number') {
    return '';
  }

  return number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

};

export default formatNumber;
