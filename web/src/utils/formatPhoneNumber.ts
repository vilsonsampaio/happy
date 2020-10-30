function formatPhoneNumber(number: string) {
  // (71) 9 9667-6616

  // Limpando tudo aquilo que não for número.
  const onlyNumber = number.replace(/[^0-9]/g, '');

  // Se a quantidade de números for maior que 11 (contém apenas DD e número)
  if (onlyNumber.length > 11) {

    // Retorna apenas o número limpo, supondo que o código do país já fora informado.
    return onlyNumber;
  } else {
    
    // Retorna o número limpo com o código do país.
    return '55'+onlyNumber;
  }
}

export default formatPhoneNumber;