import React from 'react';
import SearchFrom from './';
import { mount } from 'cypress-react-unit-test';

describe('SearchFrom', () => {
  it('displays button disabled when text input field is empty', () => {
    mount(<SearchFrom searchTerm={''} />);

    cy.get('button').should('be.disabled');
  });

  it('displays button enabled when text input field is filled', () => {
    mount(<SearchFrom searchTerm={'a'} />);

    cy.get('button').should('be.enabled');
  });
});
