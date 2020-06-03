import React from 'react';

import { InputWithLabel } from './components/InputWithLabel';
import { List } from './components/List';
import { ParagraphWithEllipsis } from './components/ParagraphWithEllipsis';

import { storiesReducer } from './lib/storiesReducer';
import { useSemiPersistentState } from './lib/useSemiPersistentState';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  React.useEffect(() => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    fetch(`${API_ENDPOINT}react`)
      .then(response => response.json())
      .then(result => {
        dispatchStories({
          type: 'STORIES_FETCH_SUCCESS',
          payload: result.hits,
        });
      })
      .catch(() =>
        dispatchStories({ type: 'STORIES_FETCH_FAILURE'})
      );
  }, []);

  const handleRemoveStories = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearch = event => {
    setSearchTerm(event.target.value)
  };

  const searchedStories = stories.data.filter(story =>
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

      {stories.isError &&
        <ParagraphWithEllipsis>Something went wrong</ParagraphWithEllipsis>
      }

      {
        stories.isLoading ? (
          <ParagraphWithEllipsis>Loading</ParagraphWithEllipsis>
        ) : (
          <List
            list={searchedStories}
            onRemoveItem={handleRemoveStories}
          />
        )
      }
    </div>
  );
};

export default App;
