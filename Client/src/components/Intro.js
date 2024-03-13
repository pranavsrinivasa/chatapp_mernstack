import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Features/ThemeSlice';


function Intro() {
  const lightTheme = useSelector((state) => state.themeKey);
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData)
  const nav = useNavigate();
  useEffect(() =>{if(!userData){
    console.log("User not authenticated");
    nav("/");
  }},[]);
  return (
    <div className={'Intro-Page'+ ((lightTheme)?"":" black")}>
        <img src='/chat.png' className='Intro-Logo'/>
        <p className='intro-text'> Welcome to the chatapp</p> 
        <p className='intro-text'>We won't leak your chats here, wink wink</p>
    </div>
  );
}

export default Intro 