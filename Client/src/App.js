import React from 'react'
import './App.css';
import Main_container from './components/Main_container';
import LoginPage from './components/LoginPage'
import { Route, Routes } from 'react-router-dom';
import Intro from './components/Intro';
import ChatArea from './components/ChatArea';
import CreateGroups from './components/CreateGroups';
import Users from './components/AllUsers';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LoginPage />}/>
        <Route path='app' element={<Main_container />}>
          <Route path='welcome' element={<Intro/>}></Route>
          <Route path='chat/:_id' element={<ChatArea/>}></Route>
          <Route path='create-groups' element={<CreateGroups/>}></Route>
          <Route path="users" element={<Users />}></Route>
        </Route>
      </Routes>
      {/* <LoginPage/> */}
      {/* <Main_container/> */}
    </div>
  );
}

export default App;
