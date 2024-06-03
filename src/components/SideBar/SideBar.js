import React from 'react';
import TextField from '@mui/material/TextField';
import './SideBar.css';

function SideBar({ city, setCity }) {
  const [inputValue, setInputValue] = React.useState('');

  const handleButtonClick = (event) => {
    event.preventDefault();
    setCity(inputValue);
  };

  return (
    <div className="sidebar">
      <form onSubmit={handleButtonClick}>
        <TextField
          label="Enter city"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Change City</button>
      </form>
    </div>
  );
}

export default SideBar;