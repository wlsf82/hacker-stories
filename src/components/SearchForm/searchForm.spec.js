import * as React from 'react'
import { mount } from '@cypress/react'
import SearchFrom from '.'

describe('SearchFrom component', () => {
  it('renders with a value', () => {
    mount(<SearchFrom searchTerm="foo"/>)

    cy.get('input').should('have.value', 'foo')
  })
})
