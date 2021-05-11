import * as React from 'react'
import { mount } from '@cypress/react'
import Button from './'

describe('Button component', () => {
  it('renders', () => {
    mount(<Button>Click me!</Button>)

    cy.get('button')
      .contains('Click me!')
      .should('be.visible')
      .and('be.enabled')
  })

  it('renders disabled', () => {
    mount(<Button isDisabled={true}>I'm disabled.</Button>)
    
    cy.get('button').should('be.disabled')
  })

  it('handles a button click event', () => {
    mount(
      <Button onClick={cy.stub().as('buttonHandler')}>
        Click here
      </Button>
    )

    cy.get('button').contains('Click here').click()

    cy.get('@buttonHandler').should('have.been.calledOnce')
  })
})
