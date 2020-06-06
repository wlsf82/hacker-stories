import React from 'react';
import renderer from 'react-test-renderer';

import InputWithLabel from '../components/InputWithLabel';

describe('InputWithLabel', () => {
  it('renders snapshot', () => {
    const inputWithLabelProps = {
      id: 'foo',
      value: 'Cypress',
      onInputChange: jest.fn(),
    };

    const component = renderer.create(
      <InputWithLabel {...inputWithLabelProps}>
        Cypress
      </InputWithLabel>
    )
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
