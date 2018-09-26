import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import SearchDestination from './components/SearchDest'
import Signup from './components/Signup'
import Login from './components/Login'


class App extends Component {
	state = {
   response: ''
 };
  

  render() {
    return (
      <div>
        <Header/>
        <SearchDestination/>
        <Signup/>
        <Login/>
      </div>
    );
  }
}

export default App;
