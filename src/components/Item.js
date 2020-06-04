import React from 'react';

import { Button } from './Button';

export const Item = ({ item, onRemoveItem }) => (
  <div className="item">
    <span style={{ width: '40%' }}>
      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {item.title}
      </a>
    </span>
    <span style={{ width: '30%' }}>{item.author}</span>
    <span style={{ width: '10%' }}>{item.num_comments}</span>
    <span style={{ width: '10%' }}>{item.points}</span>
    <span style={{ width: '10%' }}>
      <Button
        onClick={() => onRemoveItem(item)}
        className="button button-small"
      >
        Dismiss
      </Button>
    </span>
  </div>
);
