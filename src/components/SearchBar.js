import React from 'react';

function SearchBar({ city, setCity }) {
  const [inputValue, setInputValue] = React.useState('');

  const handleButtonClick = (event) => {
    event.preventDefault();
    setCity(inputValue);
  };

  return (
    <form onSubmit={handleButtonClick}>
      <input
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
        placeholder="Enter city"
      />
      <button type="submit">Change City</button>
      <div></div>
    </form>
  );
}

export default SearchBar;