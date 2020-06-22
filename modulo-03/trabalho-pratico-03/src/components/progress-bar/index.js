import React from 'react';
import './styles.css';

export default function ProgressBar({percentageDiscountINSS, percentageDiscountIRPF, percentageNetSalary}) {
  return (
    <div className="progress">
      <div
        className="progress-bar bg-warning"
        role="progressbar" 
        style={{width: `${percentageDiscountINSS}%`}}
        aria-valuemin="0"
        aria-valuemax="100"
      />
      <div
        className="progress-bar bg-danger"
        role="progressbar"
        style={{width: `${percentageDiscountIRPF}%`}}
        aria-valuemin="0"
        aria-valuemax="100"
      />
      <div
        className="progress-bar bg-success"
        role="progressbar"
        style={{width: `${percentageNetSalary}%`}}
        aria-valuemin="0"
        aria-valuemax="100"
      />
    </div>
  );
}