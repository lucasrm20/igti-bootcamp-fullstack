import React, { useState, useEffect } from 'react';
import './App.css';

import calcCompoundInterest from './util/compound-interest';

import Form from './components/form';
import Table from './components/table';

function App() {

  const [compoundInterest, setCompoundInterest] = useState([]);
  const [compoundInterestConfig, setCompoundInterestConfig] = useState({
    initialValue  : 0,
    interestRate  : 0,
    numMonths     : 0,
  });

  useEffect(() => {
    setCompoundInterest(calcCompoundInterest(compoundInterestConfig));
  }, [compoundInterestConfig]);

  return (
    <div className="container">
      <h1 className="text-center mt-3">React - Juros Compostos</h1>
      <hr/>

      <Form setCompoundInterest={setCompoundInterestConfig} />
      <Table className="mt-3" compoundInterest={compoundInterest} />

    </div>
  );
}

export default App;
