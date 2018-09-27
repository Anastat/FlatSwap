import React from 'react'
import Notification from './Notification'
import loginService from '../services/login'



class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            user: null
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
            this.setState({email: '', password: '', user})
        } catch (exeption) {
            this.setState({
                error: 'email or password wrong'
            })
            setTimeout(() => {
                this.setState({error: null})
            }, 5000)
        }
    }

    handleFieldChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }
    render () {
        return (
            <div>
                <form onSubmit={this.login}>
                    <Notification message={this.state.error} />
                    <h2>Login</h2>
                    email: <input type='email' name='email' value={this.state.email} onChange={this.handleFieldChange}/>
                    password: <input type='password' name='password' value={this.state.value} onChange={this.handleFieldChange}/>
                    <button type='submit'>Login</button>
                </form>
                
            </div>
        )
    }
}
export default Login