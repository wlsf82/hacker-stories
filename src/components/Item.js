import React from 'react';

import { Button } from './Button';

export const Item = ({ item, onRemoveItem }) => (
  <div>
    <span>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.title}
      </a>
    </span>
    <span>{item.author}</span>
    <span>{item.num_comments}</span>
    <span>{item.points}</span>
    <span>
      <Button onClick={() => onRemoveItem(item)}>
        Dismiss
      </Button>
    </span>
  </div>
);
