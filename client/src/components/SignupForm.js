import React from 'react'
import Notification from './Notification'

const SignUp =(props) => {
        return (
            <div>
                <Notification message={props.error}/>
                <form onSubmit = {props.handleSigup}>
                <h2>Sign Up</h2>
                email: <input type="email" 
                    name="email"
                    value={props.email} 
                    onChange={props.handleChange}/>
                First name: <input type="text" 
                    name="firstName"
                    value={props.firstName} 
                    onChange={props.handleChange}/>
                Last name: <input type="text" 
                    name="lastName"
                    value={props.lastName} 
                    onChange={props.handleChange}/>
                Password: <input type="password" 
                    name="password"
                    value={props.password} 
                    onChange={props.handleChange}/>
                <button type="submit">Sign Up</button>
                </form>
            </div>
        )
}

export default SignUp