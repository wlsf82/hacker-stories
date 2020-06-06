import React from 'react';
import renderer from 'react-test-renderer';

import { Footer } from '../components/Footer';

describe('Footer', () => {
  it('renders snapshot', () => {
    const component = renderer.create(<Footer />)
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
