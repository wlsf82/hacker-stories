import * as React from 'react'
import { mount } from '@cypress/react'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    mount(<App />)
  })

  it('renders 20 stories then 40 when clicking "More"', () => {
    cy.get('.item').should('have.length', 20)

    cy.get('button').contains('More').click()

    cy.get('.item').should('have.length', 40)
  })

  it('removes one story from the list', () => {
    cy.get('.item').should('have.length', 20)

    cy.get('.button-small').first().click()

    cy.get('.item').should('have.length', 19)
  })
})
