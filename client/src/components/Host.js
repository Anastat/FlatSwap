import React from 'react'
import hostService from '../services/host'
import Notification from './Notification'

//4 phases: 
//actually first you need to make sure the person is logged in. "Please login or signup first"
//1: Do you own the apartment? If not, do you have owner's permission to sublet the apartment/room?
//2: Basic information
//   Apartment? Room? Size? Rent? Address (only shared when the swap is confirmed
//   Time period, flexibility?
//3: Details
//   Other costs (insurance, electricity, heating, wifi, anything included?), 
//   if room -> lock? pets?, furniture? washing machine?
//   tv? iron? hair dryer? necessities (towels, sheets etc)? 
//   demanded alarms? smoke alarm? carbon monoxide alarm? first aid kit? safety card? fire extinguisher? 
//   access to any other spaces? gym? sauna?
//4: Overview
//   confirmation


class Host extends React.Component {
	constructor(props) {
		super(props)
		this.state= {
			//Here all information needed of the flat
			mode: "eligibility",
			user: null,
			ownership: false,
			permission: false,
			address: '',
			
			
		}
		this._handleRadio = this._handleRadio.bind(this);
	}
	
	isLoggedIn() {
		
		/*
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
		    const user = JSON.parse(loggedUserJSON)
		    this.setState({user})
		}
		console.log(this.state.user)
		console.log((this.state.user !== null))
		
		return (this.state.user !== null)
		*/
		return true
		
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

    _handleRadio(event) {
        const ownership = event.currentTarget.value === 'true' ? true: false;
        console.log('handle', ownership);
        this.setState({ ownership });
    }
    
    renderInputField() {
    	if (this.state.mode === "eligibility") {
    		const { ownership } = this.state;
    	    console.log(ownership, true);
    	    return (
    	    		<div>
    	            <Notification message={this.state.error}/>
    	            <form onSubmit = {this.host}>
    	            <h2>Eligibility</h2>
    	            Do you own the apartment? 
    	            <label>		
    	            <input type="radio" name="ownership" value="true" checked={ownership === true} onChange={this._handleRadio} />Yes 
    	            </label>
    	            <label>
    	            <input type="radio" name="ownership" value="false" onChange={this._handleRadio}/>No 
    	            </label>
    	            <button type="submit">Next</button>
    	            </form>
    	            </div>	
    	    )
    	}
    }
    render () {
    	if (this.isLoggedIn()) {
    		
    		return (
    			<div>
    			{this.renderInputField()}
    			</div>
	    		
        )
    	} else {
    		return(
    			<div>
    			Please login or signup first
    			</div>
    		)
    	}
        
    }
}
export default Host