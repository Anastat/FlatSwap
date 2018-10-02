import React from 'react'
import {Message} from 'semantic-ui-react'

const Notification = ({message}) => {
    if (message === null) {
        return null
    }
    return (
        <Message floating content={message}/>
     
    )
}

export default Notification