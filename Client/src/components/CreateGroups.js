import React from 'react'
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Features/ThemeSlice';

function CreateGroups() {
  const lightTheme = useSelector((state) => state.themeKey);
  const dispatch = useDispatch();
  return (
    <div className='creategroup-cont'>
        <div className={'text_input'+ ((lightTheme)?"":" dark")}>
          <input placeholder='Enter Group Name' className='search_box'></input>
          <IconButton>
            <SendIcon/>
          </IconButton>
        </div>
    </div>
  )
}

export default CreateGroups