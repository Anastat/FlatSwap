import React, { Component } from 'react';
import './App.css';
import Header from './components/Header'
import SearchDestination from './components/SearchDest'
import SignupForm from './components/SignupForm'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Togglable from './components/Togglable'
import signupService from './services/signup'


class App extends Component {
	state = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    response: '',
    user: null,
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
  

  render() {

    const loginForm =() => (
      <Togglable buttonLabel='Login'>
        <LoginForm 
          visible={this.state.visible}
          handleSubmit={this.login} 
          handleChange={this.handleLoginFieldChange} 
          email={this.state.email} 
          password={this.state.password} 
          error={this.state.error}/>
      </Togglable>  
    )

    const signupForm = () => (
      <Togglable buttonLabel='Sign up'>
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
      </Togglable>
    )
    return (
      <div>
        <Header/>

        
        
      </div>
    )
  }
}

export default App;
/*
<SearchDestination/>
{this.state.user === null ? signupForm() : 
          <button onClick={this.logout}>Log out</button>
        }
        {this.state.user === null ? loginForm() : 
          <div>
            <p>{this.state.user.name} logged in</p>
          </div>
        }*/