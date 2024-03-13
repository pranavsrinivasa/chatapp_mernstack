import React, { useState , useContext,useEffect} from 'react'
import './main_cont_styles.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Features/ThemeSlice';
import { refreshSidebarFun } from "../Features/refreshSidebar";
import { myContext } from './Main_container';
import axios from "axios";

function Sidebar() {

    const userData = JSON.parse(localStorage.getItem("userData"));
    const buttons = useNavigate();
    if (!userData) {
        console.log("User not Authenticated");
        buttons("/");
    }
    console.log(userData)
    const lightTheme = useSelector((state) => state.themeKey);
    const dispatch = useDispatch();
    const { refresh, setRefresh } = useContext(myContext);
    console.log("Context API : refresh : ", refresh);
    const [conversations, setConversations] = useState([]);
    const navigate = useNavigate();
    const user = userData.data;
    useEffect(() => {
        // console.log("Sidebar : ", user.token);
        const config = {
        headers: {
            Authorization: `Bearer ${user.token}`,
        },
        };

        axios.get("http://localhost:5000/chat/", config).then((response) => {
        console.log("Data refresh in sidebar ", response.data);
        setConversations(response.data);
        // setRefresh(!refresh);
        });
    }, [refresh]);

    console.log(conversations);


    return (
        <div className='sidebar_cont'>
            <div className={'sb_header' + ((lightTheme)?"":" dark")}>
                <div>
                    <IconButton onClick={()=>{buttons('welcome')}} className={'icon' + ((lightTheme)?"":" dark")}>
                        <AccountCircleIcon/>    
                    </IconButton>
                </div>
                <div>
                    <IconButton onClick={()=>{buttons('users')}} className={'icon' + ((lightTheme)?"":" dark")}>
                        <PersonAddIcon/>    
                    </IconButton>
                    <IconButton onClick={()=>{buttons('create-groups')}} className={'icon' + ((lightTheme)?"":" dark")}>
                        <GroupAddIcon/>    
                    </IconButton>
                    <IconButton onClick={()=>{buttons('create-groups')}} className={'icon' + ((lightTheme)?"":" dark")}>
                        <AddCircleIcon/>    
                    </IconButton>
                    <IconButton onClick={()=>{dispatch(toggleTheme())}}  className={'icon' + ((lightTheme)?"":" dark")}>
                        {lightTheme && <NightsStayIcon/>}
                        {!lightTheme && <LightModeIcon/>}    
                    </IconButton>
                    <IconButton onClick={() => {localStorage.removeItem("userData"); buttons("/");}}>
                        <ExitToAppIcon className={"icon" + (lightTheme ? "" : " dark")} />
                    </IconButton>
                </div>
            </div>
            <div className={'sb_search'+ ((lightTheme)?"":" dark")}>
                <IconButton className={'icon'+ ((lightTheme)?"":" dark")}>
                    <PersonSearchIcon/>
                </IconButton>
                <input placeholder='search' className='search_box'></input>
            </div>
            <div className={'sb_convs'+ ((lightTheme)?"":" dark")}>
            {conversations.map((conversation, index) => {
                var chatName = "";
                if(conversation.boolGroup){
                    chatName = conversation.chatName;
                }else{
                    conversation.userArray.map((user)=>{
                        if(user._id !== userData.data._id){
                            chatName = user.name;
                        }
                    })
                }
                if (conversation.latestMessage === undefined) {
                    // console.log("No Latest Message with ", conversation.users[1]);
                    return (
                    <div
                        key={index}
                        onClick={() => {
                        console.log("Refresh fired from sidebar");
                        // dispatch(refreshSidebarFun());
                        setRefresh(!refresh);
                        }}
                    >
                        <div
                        key={index}
                        className="conv_grid"
                        onClick={() => {
                            navigate(
                            "chat/" +
                                conversation._id +
                                "&" +
                                conversation.userArray[1].name
                            );
                        }}
                        // dispatch change to refresh so as to update chatArea
                        >
                        <p className={"conv_icon" + (lightTheme ? "" : " dark")}>
                            {conversation.userArray[1].name[0]}
                        </p>
                        <p className="conv_name">
                            {conversation.userArray[1].name}
                        </p>

                        <p className="conv_last">
                            No previous Messages, click here to start a new chat
                        </p>
                        {/* <p className={"conv_timeStamp" + (lightTheme ? "" : " dark")}>
                        {conversation.timeStamp}
                    </p> */}
                        </div>
                    </div>
                    );
                } else {
                    return (
                    <div
                        key={index}
                        className="conv_grid"
                        onClick={() => {
                        navigate(
                            "chat/" +
                            conversation._id +
                            "&" +
                            conversation.userArray[1].name
                        );
                        }}
                    >
                        <p className={"conv_icon" + (lightTheme ? "" : " dark")}>
                        {conversation.userArray[1].name[0]}
                        </p>
                        <p className="conv_name">
                        {conversation.userArray[1].name}
                        </p>

                        <p className="conv_last">
                        {conversation.latestMessage.content}
                        </p>
                        {/* <p className={"conv_timeStamp" + (lightTheme ? "" : " dark")}>
                        {conversation.timeStamp}
                    </p> */}
                    </div>
                    );
                }
                })}  
            </div>
        </div>
    )
}

export default Sidebar