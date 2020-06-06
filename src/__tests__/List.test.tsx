import React from 'react';
import renderer from 'react-test-renderer';

import Item from '../components/Item';
import List from '../components/List';

describe('List', () => {
  const list = [
    {
      title: 'React',
      url: 'https://reactjs.org/',
      author: 'Jordan Walke',
      num_comments: 3,
      points: 4,
      objectID: 0,
    },
    {
      title: 'Redux',
      url: 'https://redux.js.org/',
      author: 'Dan Abramov, Andrew Clark',
      num_comments: 2,
      points: 5,
      objectID: 1,
    },
  ];

  const handleRemoveItem = jest.fn();

  let component: any;

  beforeEach(() => {
    component = renderer.create(<List list={list} onRemoveItem={handleRemoveItem} />);
  });

  it('renders two items', () => {
    expect(component.root.findAllByType(Item).length).toEqual(2);
  });

  it('renders snapshot', () => {
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
