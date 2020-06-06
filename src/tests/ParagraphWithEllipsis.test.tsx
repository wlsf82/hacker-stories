import React from 'react';
import renderer from 'react-test-renderer';

import { ParagraphWithEllipsis } from '../components/ParagraphWithEllipsis';

describe('ParagraphWithEllipsis', () => {
  it('renders snapshot', () => {
    const component = renderer.create(
      <ParagraphWithEllipsis>
        Test
      </ParagraphWithEllipsis>
    )
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
