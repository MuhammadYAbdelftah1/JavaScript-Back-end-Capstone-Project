import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCloud, FaMobileAlt, FaDesktop, FaDatabase, FaCode } from 'react-icons/fa';

function MainPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/items')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => console.error('Error fetching items:', error));
  }, []);

  return (
    <div className="main-content home">
      <h1>Welcome to MyBrand</h1>
      <h2>Our Services</h2>
      <div className="product-list">
        <Link to="/services/cloud">
          <div className="product">
            <FaCloud className="product-icon" />
            <h3>Cloud Services</h3>
            <p>Scalable and reliable cloud solutions.</p>
          </div>
        </Link>
        <Link to="/services/mobile">
          <div className="product">
            <FaMobileAlt className="product-icon" />
            <h3>Mobile Development</h3>
            <p>Innovative mobile app development.</p>
          </div>
        </Link>
        <Link to="/services/desktop">
          <div className="product">
            <FaDesktop className="product-icon" />
            <h3>Desktop Applications</h3>
            <p>Robust desktop software development.</p>
          </div>
        </Link>
        <Link to="/services/database">
          <div className="product">
            <FaDatabase className="product-icon" />
            <h3>Database Management</h3>
            <p>Secure and efficient database solutions.</p>
          </div>
        </Link>
        <Link to="/services/software">
          <div className="product">
            <FaCode className="product-icon" />
            <h3>Custom Software</h3>
            <p>Bespoke software tailored to your needs.</p>
          </div>
        </Link>
      </div>
      <h2>Items List</h2>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            <Link to={`/items/${item._id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MainPage;
