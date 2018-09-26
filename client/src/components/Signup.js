import React from 'react'
import signupService from '../services/signup'
import Notification from './Notification'

class SignUp extends React.Component {
    constructor(props) {
        super(props),
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            error: ''
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
            this.setState({
                email: '',
                firstName: '',
                lastName: '',
                password: ''
            })
        } catch (exeption) {
            this.setState({error: 'something went wrong'})
            setTimeout(() => {
                this.setState({error: null})
            }, 5000)
        }
    }

    handleSignUpFieldChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }


    render () {
        return (
            <div>
                <Notification message={this.state.error}/>
                <form onSubmit = {this.signUp}>
                Sign Up
                email: <input type="email" 
                    name="email"
                    value={this.state.email} 
                    onChange={this.handleSignUpFieldChange}/>
                First name: <input type="text" 
                    name="firstName"
                    value={this.state.firstName} 
                    onChange={this.handleSignUpFieldChange}/>
                Last name: <input type="text" 
                    name="lastName"
                    value={this.state.lastName} 
                    onChange={this.handleSignUpFieldChange}/>
                Password: <input type="password" 
                    name="password"
                    value={this.state.password} 
                    onChange={this.handleSignUpFieldChange}/>
                <button type="submit">Sign Up</button>
                </form>
            </div>
        )
    }
}

export default SignUp