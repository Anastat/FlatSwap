import React from 'react'
import '../styles/Header.css';
import logo from '../images/flatSwap_logo.png'
import {
	  Route,
	  NavLink,
	  HashRouter
	} from "react-router-dom";
import Host from "./Host";
import Login from "./Login";
import Signup from "./Signup";

const Header = () => {
    return (
      <HashRouter>
      <div className="App-Header">
      <img className="logo" src={logo} alt="logo"/>
      <ul>
        <li><NavLink to="/hosting">Become a host</NavLink></li>
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/signup">Sign up</NavLink></li>
      </ul>
      <div className="content">
      <Route path="/login" component={Login}/>
      <Route path="/signup" component={Signup}/>
      <Route path="/hosting" component={Host}/>
    </div>
    </div>
    </HashRouter>
    )
}

export default Header