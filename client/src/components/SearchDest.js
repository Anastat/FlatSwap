import React from 'react'
import '../styles/SearchDest.css';
import {Form, Button} from 'semantic-ui-react'

const SearchDest =(props) => {
    return (
        <Form className="SearchDiv" onSubmit={props.onSubmit} inverted>
        <h1>Start your study abroad with Flat Swap</h1>
        <Form.Group>
        <Form.Input icon='search' placeholder='Destination...' size='big' width='16'
         value={props.destination} onChange={props.handleChange}></Form.Input> 
       <Button  type='submit'>Search</Button>
        </Form.Group>
      
    </Form>
    )
}
export default SearchDest
