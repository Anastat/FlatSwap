import React from 'react'
import hostService from '../services/host'
import Notification from './Notification'

class Host extends React.Component {
	constructor(props) {
		super(props)
		this.state= {
			//Here all information needed of the flat
			address: '',
			
		}
	}
	host = async (event) => {
        event.preventDefault()
        try {
            const flat = await hostService.host({
                //info
            	address: this.state.address,
            })
            this.setState({
                address: ''
            })
        } catch (exeption) {
            this.setState({error: 'something went wrong'})
            setTimeout(() => {
                this.setState({error: null})
            }, 5000)
        }
    }

    handleHostFieldChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }


    render () {
        return (
            <div>
                <Notification message={this.state.error}/>
                <form onSubmit = {this.host}>
                Start hosting
                address: <input type="text" 
                    address="address"
                    value={this.state.address} 
                    onChange={this.handleHostFieldChange}/>
                <button type="submit">Start hosting</button>
                </form>
            </div>
        )
    }
}
export default Host