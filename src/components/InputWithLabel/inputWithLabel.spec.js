import * as React from 'react'
import { mount } from '@cypress/react'
import InputWithLabel from './'

describe('InputWithLabel component', () => {
  it('renders focused, with a label and value', () => {
    const props = {
      value: 'Cypress.io',
      isFocused: true,
      children: 'Search here:',
    }
    mount(<InputWithLabel {...props}/>)

    cy.get('input')
      .should('have.focus')
      .and('have.value', props.value)
    cy.get('label').should('have.text', props.children)
  })

  it('renders not focused, with a label and value', () => {
    const props = {
      value: 'Cypress.io',
      isFocused: false,
      children: 'Search here:',
    }
    mount(<InputWithLabel {...props}/>)

    cy.get('input')
      .should('not.have.focus')
      .and('have.value', props.value)
    cy.get('label').should('have.text', props.children)
  })

  it('renders focused, with a label and no value', () => {
    const props = {
      isFocused: true,
      children: 'Search here:',
    }
    mount(<InputWithLabel {...props}/>)

    cy.get('input')
      .should('have.focus')
    cy.get('label').should('have.text', props.children)
  })

  it('renders not focused, with a label and no value', () => {
    const props = {
      isFocused: false,
      children: 'Search here:',
    }
    mount(<InputWithLabel {...props}/>)

    cy.get('input')
      .should('not.have.focus')
    cy.get('label').should('have.text', props.children)
  })

  context('Different input types', () => {
    const types = [
      'checkbox',
      'radio',
      'range',
      'date',
      'file',
      'color',
    ]

    types.forEach(type => {
      it(`renders as a ${type}`, () => {
        const props = {
          children: `I'm the label of a ${type} field`,
          type
        }

        mount(<InputWithLabel {...props}/>)

        cy.get('label')
          .should('be.visible')
          .and('have.text', props.children)
        cy.get('input').should('be.visible')
      })
    })
  })
})
