// Results.js
import React from 'react';

function Results({ results }) {
  return (
    <div className="results">
      {results.map((result, index) => (
        <div key={index} className="card">
          <h3>{result.name}</h3>  
          <p>Plays: {result.count}</p>
          <p>Total time played: {result.msPlayed}</p>
          {result.songs && (
            <div>
              <h4>Songs:</h4>
              <ul>
                {Array.from(result.songs).map((song, index) => (
                  <li key={index}>{song}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Results;
