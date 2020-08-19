import React from 'react';
import Item from '.';
import { mount } from 'cypress-react-unit-test';
const story = require('../../../cypress/fixtures/stories.json').hits[0];

describe('Item', () => {
  it('properly renders an item', () => {
    mount(<Item item={story} />);

    cy.get(`a[href='${story.url}']`)
      .should('be.visible')
      .and('contain', story.title);
    cy.get(`span:contains(${story.author})`).should('be.visible');
    cy.get(`span:contains(${story.num_comments})`).should('be.visible');
    cy.get(`span:contains(${story.points})`).should('be.visible');
    cy.get('.button.button-small').should('be.visible');
  });

  it('correctly calls button click', () => {
    const onRemoveItem = cy.stub();

    mount(<Item item={story} onRemoveItem={onRemoveItem} />);

    cy.get('.button.button-small')
      .should('be.visible')
      .click()
      .then(() => {
        expect(onRemoveItem).to.be.calledWith(story);
      });
  });
});
