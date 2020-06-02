import React from 'react';

export const InputWithLabel = ({
  id,
  label,
  value,
  type = 'text',
  onInputChange
}) => (
  <>
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onInputChange}
    />
  </>
)
