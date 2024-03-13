import React from 'react'
import { useDispatch } from 'react-redux'

function MessageSelf({ props }) {
    const dispatch = useDispatch();
    console.log("Message self: ",props)
    return (
    <div className='self_message'>
        <div className='messageBox'>
            <p className='conv_last'>{props.content}</p>
            {/* <p className='self_timestamp'>YZ:ZXpm</p> */}
        </div>
    </div>
  )
}

export default MessageSelf