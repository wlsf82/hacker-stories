import React from 'react';
import axios from 'axios';

import { Button } from './components/Button';
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

  const [url, setUrl] = React.useState(
    `${API_ENDPOINT}${searchTerm}`
  );

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const result = await axios.get(url);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE'});
    }
  }, [url]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStories = item => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearchInput = event => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = () => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);
  };

  return (
    <div>
      <h1>My Hacker Stories</h1>

      <InputWithLabel
        id="search"
        value={searchTerm}
        isFocused
        onInputChange={handleSearchInput}
      >
        <strong>Search:</strong>
      </InputWithLabel>

      <Button
        isDisabled={!searchTerm}
        onClick={handleSearchSubmit}
      >
        Submit
      </Button>

      <hr />

      {stories.isError &&
        <ParagraphWithEllipsis>Something went wrong</ParagraphWithEllipsis>
      }

      {
        stories.isLoading ? (
          <ParagraphWithEllipsis>Loading</ParagraphWithEllipsis>
        ) : (
          <List
            list={stories.data}
            onRemoveItem={handleRemoveStories}
          />
        )
      }
    </div>
  );
};

export default App;
