import React, { Component } from 'react';
import './App.css';
import {Route, NavLink, withRouter} from "react-router-dom";
import Host from "./components/Host";
import Header from './components/Header'
import logo from './images/flatSwap_logo.png'
import SearchDestination from './components/SearchDest'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import hostsService from './services/host'
import signupService from './services/signup'
import {Menu, Image} from 'semantic-ui-react'
import { Redirect } from 'react-router-dom';
import defaultAvatar from './images/user_icon.png' 
import HostsDisplay from './components/HostsDisplay';


class App extends Component {
	state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    response: '',
    user: null, //user contains user.token and user object. Get user name = user.user.firstName
    loginFormVisible: false,
    signupFormVisible: false,
    destination: '',
    listFindHost: [], //list of hosts searched by user
    isHeaderHidden: false,
 };

 componentDidMount() {
const loggedUserJSON = window.localStorage.getItem('loggedUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    this.setState({user: user})
  }
 }

 searchDest = async (event) => {
   event.preventDefault()
   try {
     const listOfHosts = await hostsService.getDestination(this.state.destination)
     this.setState({destination: '', listFindHost: listOfHosts}) 
     this.props.history.push('/dispaySearch')
     
   } catch (exeption){
    console.log(exeption)
   }
 }

 login = async (event) => {
  event.preventDefault()
  try {
      const user = await loginService.login({
          email: this.state.email.toLocaleLowerCase().trim(),
          password: this.state.password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      this.setState({email: '', password: '', user: user})
  } catch (exeption) {
      this.setState({
          error: 'Email or password wrong'
      })
      setTimeout(() => {
          this.setState({error: null})
      }, 5000)
  }
}

signUp = async (event) => {
  event.preventDefault()
  try {
      await signupService.signup({
          email: this.state.email.toLocaleLowerCase().trim(),
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          password: this.state.password,
          //profilePicture: {defaultAvatar}
      })
      this.setState({
          email: '',
          firstName: '',
          lastName: '',
          password: '', 
      })
      this.setState({error: 'Please log in to continue'})
      setTimeout(() => {
          this.setState({error: null})
      }, 5000)
      this.props.history.push('/login')
  } catch (exeption) {
      this.setState({error: 'Something went wrong'})
      setTimeout(() => {
          this.setState({error: null})
      }, 5000)
  }
}

logout = () => {
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

    const searchDestination =() => (
      <SearchDestination value={this.state.destination} 
        handleChange={this.handleSearchChange}
        onSubmit={this.searchDest}
      />
    )

    const searchDisplay = () => (
      <HostsDisplay listOfHosts={this.state.listFindHost}
      />
    )

   
    return (
      <div>
      
      <div className='content'>
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
             <Menu.Item> <Image circular avatar user outline src={defaultAvatar}/>{this.state.user.user.firstName}
             <Redirect to='/' /> 
             </Menu.Item>} 
          
          
        </Menu.Menu>
      
      </Menu>
        

          <Route exact path="/" render={() => searchDestination()}/>         
          <Route path="/login" render={()=> loginForm()}/>
          <Route path="/signup" render={()=> signupForm()}/>
          <Route path='/dispaySearch' render={() => searchDisplay()}/>
          <Route exact path="/hosting" component={Host}/>
        </div>
     
      </div>
      
    )
  }
}

export default withRouter(App);