import React from 'react'
import {Form, Button, Header} from 'semantic-ui-react'

const SearchDest =(props) => {
  
    return (
        <Form className="SearchDiv" onSubmit={props.onSubmit} inverted>
        <Header as='h1'inverted size='huge' className='homePageText'>Start your study abroad with Flat Swap</Header>
        <Form.Group>
        <Form.Input icon='search' placeholder='Destination...' size='big' width='16'
         value={props.destination} onChange={props.handleChange}></Form.Input> 
       <Button  type='submit'>Search</Button>
        </Form.Group>
      
    </Form>
    )
}
export default SearchDest
