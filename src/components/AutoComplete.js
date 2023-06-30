
import React from 'react';
import '../AutoComplete.css';

function Autocomplete({ suggestions, onSuggestionClick }) {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="autocomplete-items">
      {suggestions.map((suggestion, index) => (
        <div key={index} onClick={() => onSuggestionClick(suggestion)}>
          {suggestion}
        </div>
      ))}
    </div>
  );
}

export default Autocomplete;
