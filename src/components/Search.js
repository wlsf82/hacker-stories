import React from 'react';

export const Search = props => {
  return (
    <>
      <label htmlFor="search">Search: </label>
      <input
        id="search"
        type="text"
        value={props.search}
        onChange={props.onSearch}
      />
    </>
  )
}
