import React from 'react';
import List from './';
import { mount } from 'cypress-react-unit-test';
const stories = require('../../../cypress/fixtures/stories.json').hits;

describe('List', () => {
  beforeEach(() => mount(<List list={stories} />));

  const headerSelector = '.item-header';
  const headerButtonsSelector = `${headerSelector} .list-header-button`;
  const itemSelector = '.item';

  const headers = {
    titleSelector: `${headerButtonsSelector}:contains(Title)`,
    authorSelector: `${headerButtonsSelector}:contains(Author)`,
    commentSelector: `${headerButtonsSelector}:contains(Comments)`,
    pointsSelector: `${headerButtonsSelector}:contains(Points)`,
    actionHSelector: `${headerSelector} span:contains(Action)`
  }

  const BE_VISIBLE = 'be.visible';
  const CONTAIN = 'contain';

  it('properly renders the header', () => {
    for (let key in headers) {
      cy.get(headers[key]).should(BE_VISIBLE);
    }
  });

  it('renders two items', () => {
    cy.get(itemSelector).should('have.length', 2);
  });

  context('Order by title', () => {
    it('ascending', () => {
      cy.get(headers.titleSelector)
        .should(BE_VISIBLE)
        .focus()
        .click();
  
      cy.get(itemSelector)
        .eq(0)
        .should(CONTAIN, stories[0].title)
    });
  
    it('descending', () => {
      cy.get(headers.titleSelector)
        .should(BE_VISIBLE)
        .click();
      cy.get(headers.titleSelector)
        .should(BE_VISIBLE)
        .click();
  
      cy.get(itemSelector)
        .eq(0)
        .should(CONTAIN, stories[1].title)
    });
  });

  context('Order by author', () => {
    it('ascending', () => {
      cy.get(headers.authorSelector)
        .should(BE_VISIBLE)
        .focus()
        .click();
  
      cy.get(itemSelector)
        .eq(0)
        .should(CONTAIN, stories[1].author)
    });
  
    it('descending', () => {
      cy.get(headers.authorSelector)
        .should(BE_VISIBLE)
        .click();
      cy.get(headers.authorSelector)
        .should(BE_VISIBLE)
        .click();
  
      cy.get(itemSelector)
        .eq(0)
        .should(CONTAIN, stories[0].author)
    });
  });

  context('Order by comments', () => {
    it('ascending', () => {
      cy.get(headers.commentSelector)
        .should(BE_VISIBLE)
        .focus()
        .click();
  
      cy.get(itemSelector)
        .eq(0)
        .should(CONTAIN, stories[0].num_comments)
    });
  
    it('descending', () => {
      cy.get(headers.commentSelector)
        .should(BE_VISIBLE)
        .click();
      cy.get(headers.commentSelector)
        .should(BE_VISIBLE)
        .click();
  
      cy.get(itemSelector)
        .eq(0)
        .should(CONTAIN, stories[1].num_comments)
    });
  });

  context('Order by points', () => {
    it('ascending', () => {
      cy.get(headers.pointsSelector)
        .should(BE_VISIBLE)
        .focus()
        .click();
  
      cy.get(itemSelector)
        .eq(0)
        .should(CONTAIN, stories[1].points)
    });
  
    it('descending', () => {
      cy.get(headers.pointsSelector)
        .should(BE_VISIBLE)
        .click();
      cy.get(headers.pointsSelector)
        .should(BE_VISIBLE)
        .click();
  
      cy.get(itemSelector)
        .eq(0)
        .should(CONTAIN, stories[0].points)
    });
  });
});
