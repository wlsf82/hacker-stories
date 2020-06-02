import React from 'react';

import { Item } from './Item';

export const List = ({ list }) =>
  list.map(item => <Item key={item.objectID}  item={item} />)
