function formatMoney(value) {
  return Intl
    .NumberFormat('pt-BR', {
      style     : 'currency',
      currency  : 'BRL'
    })
    .format(value);
}

function formatPercentage(value) {
  return Intl
    .NumberFormat('pt-BR', {
      style                 : 'percent',
      minimumFractionDigits : 2,
      maximumFractionDigits : 2
    })
    .format(value);
}

export {
  formatMoney,
  formatPercentage
};
