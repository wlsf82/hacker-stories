import React from 'react';
import axios from 'axios';

import './App.css';

import { List } from './components/List/List'
import { ParagraphWithEllipsis } from './components/ParagraphWithEllipsis/ParagraphWithEllipsis';
import { SearchForm } from './components/SearchForm/SearchForm';

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

  const handleSearchSubmit = event => {
    setUrl(`${API_ENDPOINT}${searchTerm}`);

    event.preventDefault();
  };

  return (
    <div className="container">
      <h1 className="headline-primary">My Hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

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

      <hr />

      <footer>
        Icons made by <a
          href="https://www.flaticon.com/authors/freepik"
          title="Freepik"
          target="_blank"
          rel="noopener noreferrer"
        >
          Freepik
        </a> from <a
          href="https://www.flaticon.com/"
          title="Flaticon"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.flaticon.com
        </a>
      </footer>
    </div>
  );
};

export default App;
