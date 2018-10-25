import React from 'react'
import hostsService from '../services/host'
import {Item, Grid, Message, Icon, Form} from 'semantic-ui-react'

class HostsDisplay extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            destination: '',
            listOfHosts: props.listOfHosts,
            destinationChanged: false,
            changedList: []
        }
    }


    handleSearchChange = (event) => {
        this.setState({ destination: event.target.value });
      };

    searchDestination = async (event) => {
        event.preventDefault()
        try {
          const list = await hostsService.getDestination(this.state.destination)
          console.log(list)
          this.setState({destination: '', changedList: list, destinationChanged: true})
        } catch (exeption){
         console.log(exeption)
        }
      }
    
    render() {
       
        const displayLIst = (list) => (
            list.length>0 ? 
            <Item.Group>
            {list.map(host => {
           let image = host.hostImg !== '' ? `../../../${host.hostImg}` : '../../../uploads/image.png'
           console.log(image)
           return (
           <Item key={host.id}>
               <Item.Image src={image} />
               <Item.Content>
                   <Item.Header>{host.hostName}</Item.Header> 
                   <Item.Meta>{host.country}, {host.town}, {host.address}</Item.Meta>
                   <Item.Description>{host.description}</Item.Description>
                   <Item.Extra>Home type: {host.hostType}, Rooms: {host.rooms}</Item.Extra>
               </Item.Content>
           </Item>
           )})}
    
           </Item.Group> : <Message className='messageNotFound' icon='globe' floating content='Sorry, we have no options for the chosen destination'/>
        )

        return (
            <Grid stackable className='displayHostsGrid' columns={2} divided>
                <Grid.Column width={4}>
                    <Form onSubmit={this.searchDestination}>
                        <Form.Input className='searchDestInput' icon={<Icon name='search' inverted circular link />} 
                            placeholder='Search...' 
                            value={this.state.destination}
                            onChange={this.handleSearchChange}
                        />
                    </Form>
                    
                </Grid.Column>
                <Grid.Column width={12}>
                <div className='displayHosts'>
        {this.state.destinationChanged  ? 
                displayLIst(this.state.changedList) :
                displayLIst(this.state.listOfHosts)
          }
       
       </div>
                </Grid.Column>
           
            </Grid>   
        )
    }

    }
    

export default HostsDisplay
