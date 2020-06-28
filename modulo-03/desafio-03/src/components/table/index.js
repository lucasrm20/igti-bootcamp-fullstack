import React from 'react';
import './styles.css';

import { formatMoney, formatPercentage } from '../../util/number-format';

export default function Table({ compoundInterest, className }) {
  return (
    <table className={`table ${className}`}>
      <thead className="table-dark">
        <tr>
          <th>Período</th>
          <th>Montante</th>
          <th>Lucro (R$)</th>
          <th>Lucro (%)</th>
        </tr>
      </thead>

      <tbody>
        {
          compoundInterest.map(({month, total, profit, profitPercentage}) => (
            <tr key={month} className={`${ profit < 0 ? 'table-danger' : 'table-success'}`}>
              <td>{month}</td>
              <td>{formatMoney(total)}</td>
              <td>{formatMoney(profit)}</td>
              <td>{formatPercentage(profitPercentage)}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
}
