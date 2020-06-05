import React from 'react';

import './Button.css';

export const Button = ({
  type = 'button',
  isDisabled = false,
  onClick,
  className,
  children
}) => (
  <button
    className={className}
    type={type}
    disabled={isDisabled}
    onClick={onClick}
  >
    {children}
  </button>
);
