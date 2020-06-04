import React from 'react';

import { Button } from './Button';
import { InputWithLabel } from './InputWithLabel';

export const SearchForm = ({
  searchTerm,
  onSearchInput,
  onSearchSubmit,
}) => (
  <form onSubmit={onSearchSubmit} className="search-form">
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
      className="button button-large"
    >
      Submit
    </Button>
  </form>
);
