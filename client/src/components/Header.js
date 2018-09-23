import React from 'react'
import '../styles/Header.css';
import logo from '../images/flatSwap_logo.png'


const Header = () => {
    return (
      <div className="App-Header">
        <img className="logo" src={logo} alt="logo"/>
        <ul>
          <li>Become a host</li>
          <li>Login</li>
          <li>Sign up</li>
        </ul>
      </div>
    )
}

export default Header