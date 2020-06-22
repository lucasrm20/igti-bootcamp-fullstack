import React from 'react';
import './styles.css';

export default function InputReadOnly({label, value, className}) {
  return (
    <div className={`form-group ${className}`}>
      <label>{label}</label>
      <input
        type="text"
        className="form-control"
        placeholder={label}
        value={value}
        readOnly
      />
    </div>
  );
}