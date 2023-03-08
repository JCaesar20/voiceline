import React, { useState } from 'react';

function App() {
  const [error, setError] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearch = async () => {
    try {
      if(query.length > 0) {
        const res = await fetch(`${process.env.BACKEND_URL}?search=${query}`);
        const data = await res.json();
        setResults(data);
        setSearchHistory([...searchHistory, query]);
      }
    } catch(e) {
      setError(true);
    }
  };

  return (
    <div>
      {error && (<p>Error has occured. Please try again later.</p>)}
      {results.length === 0 && searchHistory.length !== 0 && (<p>No Search Results.</p>) }
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((result) => (
          <li key={result.id}>{result.document.quote}</li>
        ))}
      </ul>
      <h2>Search history</h2>
      <ul>
        {searchHistory.map((query) => (
          <li key={query}>{query}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;