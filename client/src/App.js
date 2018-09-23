import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import SearchDestination from './components/SearchDest'

class App extends Component {
	state = {
   response: ''
 };
  

  render() {
    return (
      <div>
        <Header/>
        <SearchDestination/>
      </div>
    );
  }
}

export default App;
