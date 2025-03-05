import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get('query');
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch(`/api/search?query=${query}`)
      .then(response => response.json())
      .then(data => setResults(data))
      .catch(error => console.error('Error fetching search results:', error));
  }, [query]);

  return (
    <div className="main-content">
      <h2>Search Results</h2>
      {results.length > 0 ? (
        <ul>
          {results.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : (
        <p>No results found for "{query}".</p>
      )}
    </div>
  );
}

export default SearchResults;
