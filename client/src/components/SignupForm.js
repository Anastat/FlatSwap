import React from 'react'
import PropTypes from 'prop-types'
import Notification from './Notification'
import {Form, Button, Segment} from 'semantic-ui-react'

const SignupForm =(props) => {
        return (
            <Segment inverted>
                
                <Form onSubmit = {props.handleSubmit} className='menu-item' inverted>
                <h2>Sign Up</h2>
                <Notification message={props.error}/>
                <Form.Field>
                    <label>Email</label>
                    <input type="email" 
                    name="email"
                    value={props.email} 
                    onChange={props.handleChange}/>
                </Form.Field>
               <Form.Field>
                   <label>First name</label>
                   <input type="text" 
                    name="firstName"
                    value={props.firstName} 
                    onChange={props.handleChange}/>
               </Form.Field>
                <Form.Field>
                    <label>Last name</label>
                    <input type="text" 
                    name="lastName"
                    value={props.lastName} 
                    onChange={props.handleChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <input type="password" 
                    name="password"
                    value={props.password} 
                    onChange={props.handleChange}/>
                </Form.Field> 
                <Button type="submit">Sign Up</Button>
                </Form>
            </Segment>
        )
}

SignupForm.prototype = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
}

export default SignupForm