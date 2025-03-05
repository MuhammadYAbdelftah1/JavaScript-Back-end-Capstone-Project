import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Navbar({ user }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const history = useHistory();

  const handleInputChange = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 1) {
      const response = await fetch(`/api/search/suggestions?query=${value}`);
      const result = await response.json();
      setSuggestions(result);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    history.push(`/search?query=${query}`);
  };

  return (
    <nav>
      <div className="logo">MyBrand</div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        {user && <li>Welcome, {user.username}</li>}
        <li className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              value={query}
              onChange={handleInputChange}
              className="search-input"
              placeholder="Search..."
            />
            <button type="submit" style={{ display: 'none' }}>Search</button>
          </form>
          {suggestions.length > 0 && (
            <div className="suggestions">
              {suggestions.map((suggestion, index) => (
                <div key={index} className="suggestion">
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
