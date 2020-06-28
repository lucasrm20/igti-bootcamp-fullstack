function calcCompoundInterestByPeriod({ initialValue, interestRate, numMonths }) {
  return Array
    .from({ length: numMonths })
    .map((item, index) => {
    const month = index + 1;
    const total = _calcCompoundInterest(initialValue, interestRate, index + 1);
    const profit = total - initialValue
    const profitPercentage = _calcPercentage(initialValue, profit);
    
    return {
      month, total, profit, profitPercentage
    };
  });
}

function _calcCompoundInterest(amount, interestRate, time) {
  return amount * Math.pow((1 + interestRate / 100), time);
}

function _calcPercentage(total, part) {
  return total ? (part * 100 / total) / 100 : 0;
}

export default calcCompoundInterestByPeriod;
