import React from 'react';

import { Button } from './Button';
import { InputWithLabel } from './InputWithLabel';

export const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}) => (
  <form onSubmit={onSearchSubmit}>
    <InputWithLabel
      id="search"
      value={searchTerm}
      isFocused
      onInputChange={onSearchInput}
    >
      <strong>Search:</strong>
    </InputWithLabel>

    <Button
      type="submit"
      isDisabled={!searchTerm}
    >
      Submit
    </Button>
  </form>
);
