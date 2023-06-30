// App.js
import React, { useState } from 'react';
import './App.css';
import { songData, artistData, allData } from './FormattedData';
import InfiniteScroll from 'react-infinite-scroll-component';

import SearchBar from './components/SearchBar';
import Tab from './components/Tab';
import Results from './components/Results';
import AutoComplete from './components/AutoComplete';

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [activeTab, setActiveTab] = useState('Artists');
  const [results, setResults] = useState([]);
  const [items, setItems] = useState(allData.slice(0, 20));
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = () => {
    if (items.length >= allData.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      setItems(items.concat(allData.slice(items.length, items.length + 20)));
    }, 500);
  };

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    if (activeTab === 'Artists') {
      setSuggestions(
        Object.keys(artistData)
          .filter((artist) => artist.includes(newQuery.toLowerCase()))
          .slice(0, 10)
      );
    } else {
      setSuggestions(
        Object.keys(songData)
          .filter((song) => song.includes(newQuery.toLowerCase()))
          .slice(0, 10)
      );
    }
  };

  const handleSearch = () => {

    if (query) {
      if (activeTab === 'Artists') {
        if (artistData[query.toLowerCase()]) {
          const newResults = [artistData[query.toLowerCase()]];
          setResults(newResults);

        } else {
          setResults([]);
        }
      } else {
        // activeTab === 'Songs'
        if (songData[query.toLowerCase()]) {
          const newResults = [songData[query.toLowerCase()]];
          setResults(newResults);

        } else {
          setResults([]);
        }
      }
    } else {
      setResults([]);
    }
 }

const handleSuggestionClick = (suggestion) => {
  setQuery(suggestion);
  setSuggestions([]); // clear the suggestions once a suggestion is selected
};


  return (
    <div className="App">
      <div className="search-area">
      {/* <SearchBar query={query} onQueryChange={setQuery} />
      <AutoComplete suggestions={suggestions} onSuggestionClick={handleSuggestionClick} /> */}
       <SearchBar query={query} onQueryChange={handleQueryChange} suggestions={suggestions} onSuggestionClick={handleSuggestionClick} />

        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="search-area">
        <Tab title="Artists" activeTab={activeTab} onClick={() => setActiveTab('Artists')} />
        <Tab title="Songs" activeTab={activeTab} onClick={() => setActiveTab('Songs')} />
      </div>
      <Results results={results} />
      <h2 className="header-played-songs">Played Songs</h2>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {items.map((song, index) => (
          <div className="card" key={index}>
            <h3>{song.trackName}</h3>
            <h4>{song.artistName}</h4>
            <p>{song.endTime}</p>
            <p>{song.msPlayed}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default App;
