/// <reference path="../support/commands.ts" />

describe('Hacker Stories', () => {
  it('does not duplicate last searched terms buttons', () => {
    const terms = ['Cypress.io', 'React']

    cy.visit('/')

    Cypress._.times(2, () => {
      terms.forEach(term => cy.search(term))
    })

    cy.get('.last-searches')
      .as('lastSearches')
      .find(`button:contains(${terms[0]})`)
      .its('length')
      .should('not.be.gt', 1)
    cy.get('.last-searches')
      .as('lastSearches')
      .find(`button:contains(${terms[1]})`)
      .its('length')
      .should('not.be.gt', 1)
  })

  it('only shows 5 buttons for the last searched terms', () => {
    const terms = ['Cypress.io', 'React', 'JS', 'Next.js', 'Vue', 'GitHub', 'AWS']

    cy.visit('/')

    terms.forEach(term => cy.search(term))

    cy.get('.last-searches button')
      .its('length')
      .should('not.be.gt', 5)
  })
})
