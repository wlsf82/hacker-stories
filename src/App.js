import React from 'react';

import {List} from './components/List';

function App() {
  return (
    <div>
      <h1>My Hacker Stories</h1>
      <label htmlFor="search">Search: </label>
      <input id="search" type="text"></input>
      <hr />
      <List />
    </div>
  );
}

export default App;
