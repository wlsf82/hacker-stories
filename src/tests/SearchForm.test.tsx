import React from 'react';
import renderer from 'react-test-renderer';

import { SearchForm } from '../components/SearchForm';

describe('SearchForm', () => {
  const searchFormProps = {
    searchTerm: 'React',
    onSearchInput: jest.fn(),
    onSearchSubmit: jest.fn(),
  };

  let component: any;

  beforeEach(() => {
    component = renderer.create(<SearchForm {...searchFormProps} />);
  });

  it('renders the input field with its value', () => {
    const value = component.root.findByType('input').props.value;

    expect(value).toEqual(searchFormProps.searchTerm);
  });
});
