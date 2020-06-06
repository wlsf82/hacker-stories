import React from 'react';
import { sortBy } from 'lodash';

import Button from '../Button';
import Item from '../Item';

import { ListProps, Story, Stories, SORTS_ENUM, Sorting } from '../../types';

import './List.css';

const SORTS = {
  NONE: (list: Stories) => list,
  TITLE: (list: Stories) => sortBy(list, 'title'),
  AUTHOR: (list: Stories) => sortBy(list, 'author'),
  COMMENT: (list: Stories) => sortBy(list, 'num_comments').reverse(),
  POINT: (list: Stories) => sortBy(list, 'points').reverse(),
};

const List = ({ list, onRemoveItem }: ListProps) => {
  const [sort, setSort] = React.useState<Sorting>({
    sortKey: SORTS_ENUM.NONE,
    isReverse: false,
  });

  const handleSort = (sortKey: SORTS_ENUM) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;

    setSort({ sortKey, isReverse });
  };

  const sortFunction = SORTS[sort.sortKey];

  const sortedList = sort.isReverse
    ? sortFunction(list).reverse()
    : sortFunction(list);

  return (
    <div>
      <div className="item-header" style={{ display: 'flex' }}>
        <span style={{ width: '40%' }}>
          <Button
            onClick={() => handleSort(SORTS_ENUM.TITLE)}
            className="list-header-button"
          >
            Title
          </Button>
        </span>
        <span style={{ width: '30%' }}>
          <Button
            onClick={() => handleSort(SORTS_ENUM.AUTHOR)}
            className="list-header-button"
          >
            Author
          </Button>
        </span>
        <span style={{ width: '10%' }}>
          <Button
            onClick={() => handleSort(SORTS_ENUM.COMMENT)}
            className="list-header-button"
          >
            Comments
          </Button>
        </span>
        <span style={{ width: '10%' }}>
          <Button
            onClick={() => handleSort(SORTS_ENUM.POINT)}
            className="list-header-button"
          >
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
