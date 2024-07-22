import React from 'react';
import '../styles.css';

const DynamicInput = ({ type, label,value, onChange, required,error }) => {
  return (
    <div className="input-data">
    <input id={label} type={type} value={value} name={label} required={required}  onChange={onChange}/>
    <div class={error?"error-red":"underline"}></div>
    <label htmlFor={label}>{label}</label>
    </div>
  );
};
DynamicInput.defaultProps = {
    error: false,
  };
export default DynamicInput;
