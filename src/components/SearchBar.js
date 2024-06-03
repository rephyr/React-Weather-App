import React from 'react';

function SearchBar({ city, setCity }) {
  return (
    
    <div>
      <input
        type="text"
        value={city}
        onChange={e => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <div></div>
    </div>
  );
}

export default SearchBar;