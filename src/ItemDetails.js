import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ItemDetails() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`/api/items/${id}`)
      .then(response => response.json())
      .then(data => setItem(data))
      .catch(error => console.error('Error fetching item:', error));
  }, [id]);

  if (!item) return <div>Loading...</div>;

  return (
    <div className="main-content">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
    </div>
  );
}

export default ItemDetails;
