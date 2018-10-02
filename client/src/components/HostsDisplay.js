import React from 'react'
import {Item} from 'semantic-ui-react'

const HostsDisplay = ({listOfHosts}) => {
    return (
        <div className='displayHosts'>
       
            <Item.Group unstackable>
            {listOfHosts.map(host =>
            
            <Item key={host.id}>
                <Item.Image src='https://react.semantic-ui.com/images/wireframe/image.png' />
                <Item.Content>
                    <Item.Header>{host.hostName}</Item.Header> 
                    <Item.Meta>{host.country}, {host.town}, {host.address}</Item.Meta>
                    <Item.Description>{host.description}</Item.Description>
                    <Item.Extra>{host.hostType}</Item.Extra>
                </Item.Content>
            </Item>
                   
            )}

        </Item.Group>
        
        </div>
      
    )
}

export default HostsDisplay