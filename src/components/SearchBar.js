// src/components/SearchBar.js
import React from 'react';
import AutoComplete from './AutoComplete';

function SearchBar({ query, onQueryChange, suggestions, onSuggestionClick }) {
  return (
    <div style={{ position: 'relative' }}>
      <input
        type="text"
        placeholder="Search for a song or artist..."
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <AutoComplete suggestions={suggestions} onSuggestionClick={onSuggestionClick} />
    </div>
  );
}

export default SearchBar;
