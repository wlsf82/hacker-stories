import React from 'react';
import axios from 'axios';

import List from './components/List'
import ParagraphWithEllipsis from './components/ParagraphWithEllipsis';
import SearchForm from './components/SearchForm';
import Footer from './components/Footer';

import { storiesReducer } from './lib/storiesReducer';
import { useSemiPersistentState } from './lib/useSemiPersistentState';

import { Story } from './types';

import './App.css';

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?query=';

const getLastSearches = (urls: Array<string>) =>
  urls
    .reduce((result: Array<string>, url: string, index: number) => {
      const searchTerm = extractSearchTerm(url);

      if (index === 0) {
        return result.concat(searchTerm);
      }

      const previousSearchTerm = result[result.length - 1];

      if (searchTerm === previousSearchTerm) {
        return result;
      } else {
        return result.concat(searchTerm);
      }
    }, [])
    .slice(-6)
    .slice(0, -1)
    .map(extractSearchTerm);

const extractSearchTerm = (url: string) => url.replace(API_ENDPOINT, '');

const getUrl = (searchTerm: string) => `${API_ENDPOINT}${searchTerm}`;

const App = () => {
  const [searchTerm, setSearchTerm] = useSemiPersistentState(
    'search',
    'React'
  );

  const [urls, setUrls] = React.useState([getUrl(searchTerm)]);

  const [stories, dispatchStories] = React.useReducer(
    storiesReducer,
    { data: [], isLoading: false, isError: false }
  );

  const handleFetchStories = React.useCallback(async () => {
    dispatchStories({ type: 'STORIES_FETCH_INIT' });

    try {
      const lastUrl = urls[urls.length - 1];
      const result = await axios.get(lastUrl);

      dispatchStories({
        type: 'STORIES_FETCH_SUCCESS',
        payload: result.data.hits,
      });
    } catch {
      dispatchStories({ type: 'STORIES_FETCH_FAILURE'});
    }
  }, [urls]);

  React.useEffect(() => {
    handleFetchStories();
  }, [handleFetchStories]);

  const handleRemoveStory = (item: Story) => {
    dispatchStories({
      type: 'REMOVE_STORY',
      payload: item,
    });
  };

  const handleSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    handleSearch(searchTerm);

    event.preventDefault();
  };

  const handleLastSearch = (searchTerm: string) => {
    setSearchTerm(searchTerm);

    handleSearch(searchTerm);
  };

  const handleSearch = (searchTerm: string) => {
    const url = getUrl(searchTerm);
    setUrls(urls.concat(url));
  };

  const lastSearches = getLastSearches(urls);

  return (
    <div className="container">
      <h1 className="headline-primary">My Hacker Stories</h1>

      <SearchForm
        searchTerm={searchTerm}
        onSearchInput={handleSearchInput}
        onSearchSubmit={handleSearchSubmit}
      />

      {lastSearches.map((searchTerm: string, index: number) => (
        <button
          key={searchTerm + index}
          type="button"
          onClick={() => handleLastSearch(searchTerm)}
        >
          {searchTerm}
        </button>
      ))}

      {stories.isError &&
        <ParagraphWithEllipsis>Something went wrong</ParagraphWithEllipsis>
      }

      {
        stories.isLoading ? (
          <ParagraphWithEllipsis>Loading</ParagraphWithEllipsis>
        ) : (
          <List
            list={stories.data}
            onRemoveItem={handleRemoveStory}
          />
        )
      }

      <hr />

      <Footer />
    </div>
  );
};

export default App;
