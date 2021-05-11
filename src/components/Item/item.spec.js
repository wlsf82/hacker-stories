import * as React from 'react'
import { mount } from '@cypress/react'
import Item from '.'

describe('Item component', () => {
  const sampleItem = {
    title: 'Sample title',
    url: 'http://example.com/sample',
    author: 'Walmyr',
    num_comments: 4,
    points: 9
  }

  it('renders', () => {
    mount(<Item item={sampleItem} />)

    cy.get('.item')
      .should('contain', sampleItem.title)
      .and('contain', sampleItem.author)
      .and('contain', sampleItem.num_comments)
      .and('contain', sampleItem.points)
    cy.get('.item .button-small').should('be.visible')
    cy.get('.item')
      .contains(sampleItem.title)
      .should('have.attr', 'href', sampleItem.url)
  })

  it('handles the remove button click event', () => {
    mount(<Item item={sampleItem} onRemoveItem={cy.stub().as('buttonHandler')}/>)

    cy.get('.item .button-small').click()

    cy.get('@buttonHandler').should('have.been.calledOnce')
  })
})
