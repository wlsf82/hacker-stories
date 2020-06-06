import React from 'react';
import renderer from 'react-test-renderer';

import { Button } from '../components/Button';

describe('Button', () => {
  it('renders snapshot', () => {
    const component = renderer.create(
      <Button className="bar">
        Click me!
      </Button>
    )
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
