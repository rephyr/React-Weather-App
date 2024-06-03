import React from 'react';
import TextField from '@mui/material/TextField';
import './SearchBox.css';

function SearchBar({ city, setCity }) {
  const [inputValue, setInputValue] = React.useState('');

  const handleButtonClick = (event) => {
    event.preventDefault();
    setCity(inputValue);
  };

  return (
    <form onSubmit={handleButtonClick}>
      <TextField
        label="Enter city"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Change City</button>
    </form>
  );
}

export default SearchBar;