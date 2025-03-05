import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import Login from './Login';
import Register from './Register';
import ItemDetails from './ItemDetails';
import SearchResults from './SearchResults';
import CloudService from './CloudService';
import MobileService from './MobileService';
import DesktopService from './DesktopService';
import DatabaseService from './DatabaseService';
import SoftwareService from './SoftwareService';
import Navbar from './Navbar';

function App() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (query) {
      fetch(`/api/search/suggestions?q=${query}`)
        .then(response => response.json())
        .then(data => setSuggestions(data))
        .catch(error => console.error('Error fetching suggestions:', error));
    } else {
      setSuggestions([]);
    }
  }, [query]);

  return (
    <Router>
      <Navbar user={null} />
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/items/:id" component={ItemDetails} />
        <Route path="/services/cloud" component={CloudService} />
        <Route path="/services/mobile" component={MobileService} />
        <Route path="/services/desktop" component={DesktopService} />
        <Route path="/services/database" component={DatabaseService} />
        <Route path="/services/software" component={SoftwareService} />
        <Route path="/search" component={SearchResults} />
      </Switch>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for items..."
      />
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion.name} ({suggestion.category})</li> // Adjust to display the necessary fields
        ))}
      </ul>
    </Router>
  );
}

export default App;
