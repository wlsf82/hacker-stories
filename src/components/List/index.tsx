import React from 'react';

import Item from '../Item';

import { ListProps } from '../../types';

const List = ({ list, onRemoveItem }: ListProps) => (
  <>
    {list.map(item => (
      <Item
        key={item.objectID}
        item={item}
        onRemoveItem={onRemoveItem}
      />
    ))}
  </>
);

export default List;
