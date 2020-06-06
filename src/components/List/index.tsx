import React from 'react';
import { sortBy } from 'lodash';

import Button from '../Button';
import Item from '../Item';

import { ListProps, Story, Stories } from '../../types';

import './List.css';

enum SORTS_ENUM {
  NONE = 'NONE',
  TITLE = 'TITLE',
  AUTHOR = 'AUTHOR',
  COMMENT = 'COMMENT',
  POINT = 'POINT',
}

const SORTS = {
  NONE: (list: Stories) => list,
  TITLE: (list: Stories) => sortBy(list, 'title'),
  AUTHOR: (list: Stories) => sortBy(list, 'author'),
  COMMENT: (list: Stories) => sortBy(list, 'num_comments').reverse(),
  POINT: (list: Stories) => sortBy(list, 'points').reverse(),
};

const List = ({ list, onRemoveItem }: ListProps) => {
  const [sort, setSort] = React.useState<SORTS_ENUM>(SORTS_ENUM.NONE);

  const handleSort = (sortKey: SORTS_ENUM) => {
    setSort(sortKey);
  };

  const sortFunction = SORTS[sort];
  const sortedList = sortFunction(list);

  return (
    <div>
      <div className="item-header" style={{ display: 'flex' }}>
        <span style={{ width: '40%' }}>
          <Button onClick={() => handleSort(SORTS_ENUM.TITLE)}>
            Title
          </Button>
        </span>
        <span style={{ width: '30%' }}>
          <Button onClick={() => handleSort(SORTS_ENUM.AUTHOR)}>
            Author
          </Button>
        </span>
        <span style={{ width: '10%' }}>
          <Button onClick={() => handleSort(SORTS_ENUM.COMMENT)}>
            Comments
          </Button>
        </span>
        <span style={{ width: '10%' }}>
          <Button onClick={() => handleSort(SORTS_ENUM.POINT)}>
            Points
          </Button>
        </span>
        <span style={{ width: '10%' }}>
          Action
        </span>
      </div>

      {sortedList.map((item: Story) => (
        <Item
          key={item.objectID}
          item={item}
          onRemoveItem={onRemoveItem}
        />
      ))}
    </div>
  );
};

export default List;
