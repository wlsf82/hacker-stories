import React from 'react';

export const Button = ({
  type = 'button',
  isDisabled = false,
  onClick,
  children
}) =>
  <button type={type} disabled={isDisabled} onClick={onClick}>
    {children}
  </button>;
