/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    search(term: string): Chainable<void>
  }
}

Cypress.Commands.add('search', term => {
  cy.get('input[type="text"]')
    .should('be.visible')
    .clear()
    .type(`${term}{enter}`)
})
