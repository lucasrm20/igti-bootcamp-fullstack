import React, { useEffect, useState } from 'react';
import './styles.css';

export default function Form({setCompoundInterest}) {

  const [initialValue, setInitialValue] = useState(5900);
  const [interestRate, setInterestRate] = useState(0.8);
  const [numMonths, setNumMonths] = useState(12);

  useEffect(() => {
    setCompoundInterest({
      initialValue, interestRate, numMonths
    });
  }, [initialValue, interestRate, numMonths, setCompoundInterest]);

  return (
    <div className="container">
      <div className="form-row">
        <div className="form-group col-xs-12 col-sm-6 col-md-4">
          <label>Montante Inicial</label>
          <input
            type="number"
            className="form-control"
            placeholder="Montante Inicial"
            value={initialValue}
            onChange={evt => setInitialValue(evt.target.value)}
          />
        </div>

        <div className="form-group col-xs-12 col-sm-6 col-md-4">
          <label>Taxa de Juros Mensal</label>
          <input
            type="number"
            className="form-control"
            placeholder="Taxa de Juros Mensal"
            value={interestRate}
            onChange={evt => setInterestRate(evt.target.value)}
          />
        </div>

        <div className="form-group col-xs-12 col-sm-6 col-md-4">
          <label>Período (Meses)</label>
          <input
            type="number"
            className="form-control"
            placeholder="Período (Meses)"
            value={numMonths}
            onChange={evt => setNumMonths(evt.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
