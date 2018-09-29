import React from 'react'
import Notification from './Notification'
import {Button, Segment, Form} from 'semantic-ui-react'



const LoginForm =(props) => {
    return (
        <Segment inverted floated='right'>
            <Form onSubmit={props.handleSubmit} inverted>
                <Notification message={props.error} />
                <h2>Login</h2>
                <Form.Input fluid label='Email' placeholder='smith@mail.com' type='email' name='email' value={props.email} onChange={props.handleChange}/>
                <Form.Input fluid label='Password' placeholder='password'type='password' name='password' value={props.password} onChange={props.handleChange}/>
                <Button type='submit'>Login</Button>
            </Form>
        </Segment>
    )
}
   

export default LoginForm