function formatPhoneNumber(number: string) {
  const onlyNumber = number.replace(/[^0-9]/g, '');

  return (onlyNumber.length > 11) ? onlyNumber : '55'+onlyNumber;
}

export default formatPhoneNumber;