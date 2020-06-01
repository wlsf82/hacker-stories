import React from 'react';

export const Search = props => {
  return (
    <>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text" onChange={props.onSearch}></input>
    </>
  )
}
