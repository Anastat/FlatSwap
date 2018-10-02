import React from 'react'
import hostService from '../services/host'
import Notification from './Notification'
import {Form, Button, Segment, Icon, Divider, Grid} from 'semantic-ui-react'

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
			ownership: true,
			permission: true,
			isHidden: true,
			hostName: '',
			hostType: 'Apartment',
			country: '',
			town: '',
			address: '',
			description: '',
			rooms: 1
		}
		this._handleRadio = this._handleRadio.bind(this);
		this.eligible = this.eligible.bind(this);
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
	
	toggleHidden(ownership) {
		this.setState({isHidden: ownership})
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

    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    _handleRadio(event) {
    	if (event.currentTarget.name === 'ownership') {
    		const ownership = event.currentTarget.value === 'true' ? true: false;
            console.log('handle', ownership);
            this.setState({ ownership });
            this.toggleHidden(ownership)
            
    	} else if (event.currentTarget.name === 'permission') {
    		const permission = event.currentTarget.value === 'true' ? true: false;
            console.log('handle', permission);
            this.setState({ permission });
    	}
        
    }
    permissionField() {
    	const { permission } = this.state;
	    console.log(permission, true);
    	return (
    		<div>
    		<br></br>
    		
    		<div className="radio-question">
            Do you have permission to sublet the apartment/room? 
    	    </div>
            		
    	            <input 
    	            	type="radio" 
    	            	id="radio3"
    	    	        className="form-radio"
    	            	name="permission" 
    	            	value="true" 
    	            	checked={this.state.permission === true} 
    	            	onChange={this._handleRadio} />
    	            <label htmlFor="radio3">Yes</label>
    	            
    	            <input 
    	            	type="radio" 
    	            	id="radio4"
    	    	        className="form-radio"
    	            	name="permission" 
    	            	value="false" 
    	            	onChange={this._handleRadio}/>
    	            <label htmlFor="radio4">No</label>
            </div>
    )
    }
    eligible() {
    	console.log("here")
    	if (this.state.ownership || this.state.permission) {
    		//need to make sure it sets state before calling renderinputfield
    		this.setState({
    			mode: "basicInfo"
    		}, () => {
    			console.log(this.state.mode)
        		this.renderInputField()
    		})
    		
    	} else {
    		this.setState({
    			mode: "notEligible"
    		}, () => {
    			console.log(this.state.mode)
        		this.renderInputField()
    		})
    	}
    }
    
    renderInputField() {
    	if (this.state.mode === "eligibility") {
    		const { ownership } = this.state;
    	    console.log(ownership, true);
    	    
    	    return (
    	    		<div>
    	    		<Grid style={{padding: '80px'}} centered columns={3}>
    				<Grid.Column>
    				<Segment style={{width: '110%', background: 'rgba(255, 250, 250, 0.6)'}}>
    	            <Notification message={this.state.error}/>
    	            <h2>Eligibility</h2>
    	            <br></br>
    	            <div className="radio-question">
    	            Do you own the apartment?  
    	    	    </div>
    	            <input 
    	            	type="radio" 
    	            	id="radio1"
    	            	className="form-radio"
    	            	name="ownership" 
    	            	value="true" 
    	            	checked={ownership === true} 
    	            	onChange={this._handleRadio} />
    	            <label htmlFor="radio1">Yes</label>
    	            
    	            <input 
    	            	type="radio" 
    	            	id="radio2"
    	            	className="form-radio"
    	            	name="ownership" 
    	            	value="false" 
    	            	onChange={this._handleRadio}/>
    	            <label htmlFor="radio2">No</label>
    	            
    	            {!this.state.isHidden && this.permissionField()}
    	            
    	            <br></br><br></br>
    	            <Button animated onClick={this.eligible}>
    	            <Button.Content visible>Next</Button.Content>
    	            <Button.Content hidden>
    	              <Icon name='arrow right' />
    	            </Button.Content>
    	          </Button>
    	          </Segment>
    	          </Grid.Column>
    			  </Grid>
    	            </div>	
    	    )
    	} else if (this.state.mode === "basicInfo") {
    		return (
    				<div>
    				<Grid style={{padding: '80px'}} centered columns={2}>
    				<Grid.Column>
    				<Segment style={{width: '110%', background: 'rgba(255, 250, 250, 0.6)'}}>
    				<Form onSubmit = {this.host}>
    				<h2>Basic information</h2>
                    <Notification message={this.state.error}/>
                    <Form.Field>
                        <label>Short description</label>
                        <input type="text" 
                        name="hostName"
                        value={this.state.hostName} 
                        onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Flat type</label>
                        <label>		
        	            <input 
        	            	type="radio" 
        	            	name="hostType" 
        	            	value="Apartment" 
        	            	checked={this.state.hostType === 'Apartment'} 
        	            	onChange={this.handleChange} /> Apartment 
        	            </label>
        	            <label>
        	            <input 
        	            	type="radio" 
        	            	name="hostType" 
        	            	value="Room" 
        	            	onChange={this.handleChange}/> Room
        	            </label>
                    </Form.Field>
                    <Form.Group widths='equal'>
                    <Form.Field>
                        <label>Country</label>
                        <input type="text" 
                        name="country"
                        value={this.state.country} 
                        onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Town</label>
                        <input type="text" 
                        name="town"
                        value={this.state.town} 
                        onChange={this.handleChange}/>
                    </Form.Field> 
                        <Form.Field>
                        <label>Address</label>
                        <input type="text" 
                        name="address"
                        value={this.state.address} 
                        onChange={this.handleChange}/>
                    </Form.Field>
                    </Form.Group>
                    <Form.TextArea label='Description' name='description' placeholder='Details about the flat or room' onChange={this.handleChange}/>
                    <Form.Field>
                        <label>Rooms</label>
                        <input type="number" 
                        name="rooms"
                        min="1"
                        value={this.state.rooms} 
                        onChange={this.handleChange}/>
                    </Form.Field>
                    <Button type="submit">Start Hosting</Button>
                    </Form>
                    </Segment>
                    </Grid.Column>
      			  </Grid>
    				</div>
    		)
    		
    	} else if (this.state.mode === "notEligible") {
    		return (
    				<div>
    				Please ask permission from your landlord before moving forward.
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
    				
    				<Grid style={{paddingTop: '80px'}} centered columns={3}>
    				<Grid.Column>
    			    <Button primary fluid>
    			      Login
    			    </Button>
    			    <Divider horizontal>Or</Divider>
    			    <Button secondary fluid>
    			      Sign Up
    			    </Button>
    			    </Grid.Column>
    			  </Grid>
    			  
    			  
    		)
    	}
        
    }
}
 
export default Host