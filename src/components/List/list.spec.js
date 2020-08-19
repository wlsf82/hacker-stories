import React from 'react';
import List from './';
import { mount } from 'cypress-react-unit-test';
const stories = require('../../../cypress/fixtures/stories.json').hits;

describe('List', () => {
  beforeEach(() => mount(<List list={stories} />));

  const headerSelector = '.item-header';
  const headerButtonsSelector = `${headerSelector} .list-header-button`;
  const itemSelector = '.item';

  const titleHeaderSelector = `${headerButtonsSelector}:contains(Title)`;
  const authorHeaderSelector = `${headerButtonsSelector}:contains(Author)`;
  const commentHeaderSelector = `${headerButtonsSelector}:contains(Comments)`;
  const pointsHeaderSelector = `${headerButtonsSelector}:contains(Points)`;
  const actionHeaderSelector = `${headerSelector} span:contains(Action)`;

  const BE_VISIBLE = 'be.visible';
  const CONTAIN = 'contain';

  it('properly renders the header', () => {
    cy.get(titleHeaderSelector)
      .should(BE_VISIBLE);
    cy.get(authorHeaderSelector)
      .should(BE_VISIBLE);
    cy.get(commentHeaderSelector)
      .should(BE_VISIBLE);
    cy.get(pointsHeaderSelector)
      .should(BE_VISIBLE);
    cy.get(actionHeaderSelector)
      .should(BE_VISIBLE);
  });

  it('renders two items', () => {
    cy.get(itemSelector).should('have.length', 2);
  });

  context('Order by title', () => {
    it('ascending', () => {
      cy.get(titleHeaderSelector)
        .should(BE_VISIBLE)
        .focus()
        .click();
  
      cy.get(itemSelector)
        .eq(0)
        .should(CONTAIN, stories[0].title)
    });
  
    it('descending', () => {
      cy.get(titleHeaderSelector)
        .should(BE_VISIBLE)
        .click();
      cy.get(titleHeaderSelector)
        .should(BE_VISIBLE)
        .click();
  
      cy.get(itemSelector)
        .eq(0)
        .should(CONTAIN, stories[1].title)
    });
  });

  context('Order by author', () => {
    it('ascending', () => {
      cy.get(authorHeaderSelector)
        .should(BE_VISIBLE)
        .focus()
        .click();
  
      cy.get(itemSelector)
        .eq(0)
        .should(CONTAIN, stories[1].author)
    });
  
    it('descending', () => {
      cy.get(authorHeaderSelector)
        .should(BE_VISIBLE)
        .click();
      cy.get(authorHeaderSelector)
        .should(BE_VISIBLE)
        .click();
  
      cy.get(itemSelector)
        .eq(0)
        .should(CONTAIN, stories[0].author)
    });
  });

  context('Order by comments', () => {
    it('ascending', () => {
      cy.get(commentHeaderSelector)
        .should(BE_VISIBLE)
        .focus()
        .click();
  
      cy.get(itemSelector)
        .eq(0)
        .should(CONTAIN, stories[0].num_comments)
    });
  
    it('descending', () => {
      cy.get(commentHeaderSelector)
        .should(BE_VISIBLE)
        .click();
      cy.get(commentHeaderSelector)
        .should(BE_VISIBLE)
        .click();
  
      cy.get(itemSelector)
        .eq(0)
        .should(CONTAIN, stories[1].num_comments)
    });
  });

  context('Order by points', () => {
    it('ascending', () => {
      cy.get(pointsHeaderSelector)
        .should(BE_VISIBLE)
        .focus()
        .click();
  
      cy.get(itemSelector)
        .eq(0)
        .should(CONTAIN, stories[1].points)
    });
  
    it('descending', () => {
      cy.get(pointsHeaderSelector)
        .should(BE_VISIBLE)
        .click();
      cy.get(pointsHeaderSelector)
        .should(BE_VISIBLE)
        .click();
  
      cy.get(itemSelector)
        .eq(0)
        .should(CONTAIN, stories[0].points)
    });
  });
});
