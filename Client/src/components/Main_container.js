import React, { createContext,useState } from 'react'
import './main_cont_styles.css'
import Sidebar from'./Sidebar'
import Workarea from './Workarea';
import ChatArea from './ChatArea'
import Intro from './Intro';
import CreateGroups from './CreateGroups'
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Features/ThemeSlice';

export const myContext = createContext();
function Main_container() {
  
  const lightTheme = useSelector((state) => state.themeKey);
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(true);

  return (
    <div className={'main_cont'+ ((lightTheme)?"":" black")}>
      <myContext.Provider value={{ refresh: refresh, setRefresh: setRefresh }}>
        <Sidebar />
        <Outlet />
      </myContext.Provider>
        {/* <Intro/> */}
        {/* <CreateGroups/> */}
        {/* <ChatArea props={conversations} key={conversations.name}/> */}
    </div>
  );
}

export default Main_container