import React from 'react';

import { InputWithLabel } from './components/InputWithLabel'
import { List } from './components/List';
import { useSemiPersistentState } from './lib/useSemiPersistentState';

const initialStories = [
  {
    title: 'React',
    url: 'https://reactjs.org/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0,
  },
  {
    title: 'Redux',
    url: 'https://redux.js.org/',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1,
  },
];

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [stories, setStories] = React.useState(initialStories);

  const handleRemoveStories = item => {
    const newStories = stories.filter(
      story => item.objectID !== story.objectID
    );

    setStories(newStories);
  }

  const handleSearch = event => {
    setSearchTerm(event.target.value)
  };

  const searchedStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearch}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <hr />

      <List list={searchedStories} onRemoveItem={handleRemoveStories  } />
    </div>
  )
}

export default App;
