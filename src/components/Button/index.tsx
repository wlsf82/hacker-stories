import React from 'react';

import { ButtonProps } from '../../types';

import './Button.css';

export const Button = ({
  type = 'button',
  isDisabled = false,
  onClick,
  className,
  children
}: ButtonProps) => (
  <button
    className={className}
    type={type}
    disabled={isDisabled}
    onClick={onClick}
  >
    {children}
  </button>
);
