import './App.css';
import React from 'react';
const logoPath = require('./logo.svg').default as string;
console.log(logoPath);

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoPath} className="App-logo" alt="logo" />
        <p>
          words :)
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <form action="../../post" method="post" className="form">
          <button type="submit">Connected?</button>
        </form>
      </header>
    </div>
  );
}

export default App;
