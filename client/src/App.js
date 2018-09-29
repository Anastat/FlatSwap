import React, { Component } from 'react';
import './App.css';
import {Route, NavLink, HashRouter} from "react-router-dom";
import {geocodeByAddress, getLatLng} from 'react-places-autocomplete';
import Host from "./components/Host";
import Header from './components/Header'
import logo from './images/flatSwap_logo.png'
import SearchDestination from './components/SearchDest'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Togglable from './components/Togglable'
import signupService from './services/signup'
import {Menu, Image} from 'semantic-ui-react'


class App extends Component {
	state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    response: '',
    user: null,
    loginFormVisible: false,
    signupFormVisible: false,
    destination: ''
 };

 componentDidMount() {

  const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    this.setState({user})
  }
 }

 login = async (event) => {
  event.preventDefault()
  try {
      const user = await loginService.login({
          email: this.state.email,
          password: this.state.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      this.setState({email: '', password: '', user: user})
  } catch (exeption) {
      this.setState({
          error: 'email or password wrong'
      })
      setTimeout(() => {
          this.setState({error: null})
      }, 5000)
  }
}

signUp = async (event) => {
  event.preventDefault()
  try {
      const user = await signupService.signup({
          email: this.state.email,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          password: this.state.password
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      this.setState({
          email: '',
          firstName: '',
          lastName: '',
          password: '', 
          user: user
      })
  } catch (exeption) {
      this.setState({error: 'something went wrong'})
      setTimeout(() => {
          this.setState({error: null})
      }, 5000)
  }
}

logout = (event) => {
  window.localStorage.clear()
  this.setState({user: null})
} 

handleSignUpFieldChange = (event) => {
  this.setState({[event.target.name]: event.target.value})
}

handleLoginFieldChange = (event) => {
  this.setState({[event.target.name]: event.target.value})
}

handleSearchChange = (event) => {
  this.setState({ destination: event.target.value });
};
  

  render() {

    const loginForm =() => (
      
        <LoginForm 
          visible={this.state.visible}
          handleSubmit={this.login} 
          handleChange={this.handleLoginFieldChange} 
          email={this.state.email} 
          password={this.state.password} 
          error={this.state.error}/>
      
    )

    const signupForm = () => (
        <SignupForm
          visible={this.state.visible}
          handleSubmit={this.signUp}
          handleChange={this.handleSignUpFieldChange}
          email={this.state.email}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          password={this.state.password}
          error={this.state.error}
        />
    )
    return (
      <div>
        <HashRouter>
      <div className='header'>
        <Menu size='massive' secondary stackable inverted>
        <Menu.Item>
          <Image className="logo" src={logo}/>
        </Menu.Item>
        
        <Menu.Menu position='right'>
          <Menu.Item> <NavLink to='/'> Home</NavLink>
         
          </Menu.Item>
          <Menu.Item as={NavLink} to="/hosting" name='host'>
            Become a host
          </Menu.Item>
          
            {this.state.user === null ? 
            <Menu.Item as={NavLink} to="/signup"> Sign up</Menu.Item> : 
            <Menu.Item as={NavLink} to='/' onClick={this.logout}>Log out </Menu.Item>}
  
             {this.state.user===null ? 
             <Menu.Item as={NavLink} to="/login">Login</Menu.Item> : 
             <Menu.Item> {this.state.user.name}</Menu.Item>} 
          
          
        </Menu.Menu>
      
      </Menu>

      <Route exact path="/" render={() => 
          <SearchDestination value={this.state.destination} 
          handleChange={this.handleSearchChange}
          onSubmit={this.logout}/>}/>
          
      <Route path="/login" render={()=> loginForm()}/>
    <Route path="/signup" render={()=> signupForm()}/>
    <Route exact path="/hosting" component={Host}/>
    </div>
      </HashRouter>
      </div>
      
    )
  }
}

export default App;