import React from 'react'
import { useDispatch } from 'react-redux'

function MessageOthers({ props }) {
  const dispatch = useDispatch();
  console.log("Message others: ",props)
  return (
    <div className='other_message'>
      <div className='conv_grid'>
            <p className='conv_icon'>{props.sender.name[0]}</p>
            <div className='other_text'>
              <p className='conv_name'>{props.sender.name}</p>
              <p className='conv_last'>{props.content}</p>
              {/* <p className='others_timestamp'>XY:YZam</p> */}
            </div>
        </div>
    </div>
  )
}

export default MessageOthers