import React from 'react'
import { useNavigate } from 'react-router-dom'

function ConvsHistory({props}) {
  const buttons = useNavigate();
  return (
    <div className='conv_grid' onClick = {()=>{buttons('chat')}}>
        <p className='conv_icon'>{props.name[0]}</p>
        <p className='conv_name'>{props.name}</p>
        <p className='conv_last'>{props.lastmessage}</p>
        <p className='conv_timeStamp'>{props.timeStamp}</p>
    </div>
  )
}

export default ConvsHistory