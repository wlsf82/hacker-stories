import React from 'react';
import renderer from 'react-test-renderer';

import { Item } from '../components/Item';

describe('Item', () => {
  const item = {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  };
  
  const handleRemoveItem = jest.fn();

  let component: any;

  beforeEach(() => {
    component = renderer.create(
      <Item item={item} onRemoveItem={handleRemoveItem} />
    );
  });

  it('renders all properties', () => {
    expect(component.root.findByType('a').props.href).toEqual(item.url);
    expect(component.root.findAllByProps({ children: item.title }).length).toEqual(1);
    expect(component.root.findAllByProps({ children: item.author }).length).toEqual(1);
    expect(component.root.findAllByProps({ children: item.num_comments }).length).toEqual(1);
    expect(component.root.findAllByProps({ children: item.points }).length).toEqual(1);
  });

  it('calls onRemoveItem on button click', () => {
    component.root.findByType('button').props.onClick();

    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
    expect(handleRemoveItem).toHaveBeenCalledWith(item);

    expect(component.root.findAllByType(Item).length).toEqual(1)
  });

  it('renders snapshot', () => {
    let tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
