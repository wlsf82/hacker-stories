import React from 'react';

import { Item } from '../Item/Item';

import { ListProps } from '../../types';

export const List = ({ list, onRemoveItem }: ListProps) => (
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
