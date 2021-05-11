import * as React from 'react'
import { mount } from '@cypress/react'
import List from '.'

describe('Item component', () => {
  const items = [
    {
      objectID: 0,
      title: 'Sample title 1',
      url: 'http://example.com/sample-1',
      author: 'Walmyr',
      num_comments: 4,
      points: 9
    },
    {
      objectID: 1,
      title: 'Sample title 2',
      url: 'http://example.com/sample-2',
      author: 'Zoe',
      num_comments: 7,
      points: 1
    }
  ]

  beforeEach(() => {
    mount(<List list={items} />)
  })

  it('renders two items', () => {
    cy.get('.item').should('have.length', items.length)
  })

  context('Order by', () => {
    it('orders by title', () => {
      cy.get('.item-header').contains('Title').as('title').click()

      cy.get('.item').first().should('contain', items[0].title)

      cy.get('@title').click()

      cy.get('.item').first().should('contain', items[1].title)
    })

    it('orders by author', () => {
      cy.get('.item-header').contains('Author').as('author').click()

      cy.get('.item').first().should('contain', items[0].author)

      cy.get('@author').click()

      cy.get('.item').first().should('contain', items[1].author)
    })

    it('orders by comments', () => {
      cy.get('.item-header').contains('Comments').as('comments').click()

      cy.get('.item').first().should('contain', items[1].num_comments)

      cy.get('@comments').click()

      cy.get('.item').first().should('contain', items[0].num_comments)
    })

    it('orders by points', () => {
      cy.get('.item-header').contains('Points').as('points').click()

      cy.get('.item').first().should('contain', items[0].points)

      cy.get('@points').click()

      cy.get('.item').first().should('contain', items[1].points)
    })
  })
})
