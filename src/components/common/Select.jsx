// src/components/common/Select.jsx
import React from 'react';

const Select = ({ 
  label, 
  options, 
  value, 
  onChange, 
  name, 
  disabled = false,
  required = false,
  placeholder = "Select...",
  className = "",
  error = ""
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label 
          htmlFor={name} 
          className="block text-sm font-medium text-fp-dark mb-2"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`select-field ${error ? 'border-red-500' : ''} ${className}`}
        required={required}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option 
            key={option.value || option} 
            value={option.value || option}
          >
            {option.label || option}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Select;
