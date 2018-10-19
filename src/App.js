import React, { Component } from 'react';
import './App.css';
import Record from './components/record.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>
          <code>beat rockers aww yea</code>
        </p>
        <Record />
      </div>
    );
  }
}

export default App;
