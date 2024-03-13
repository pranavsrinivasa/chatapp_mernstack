import { IconButton } from '@mui/material'
import React, { useState,useRef,useContext,useEffect} from 'react'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SendIcon from '@mui/icons-material/Send';
import MessageOthers from './MessageOthers';
import MessageSelf from './MessageSelf';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../Features/ThemeSlice';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { myContext } from "./Main_container";
import Skeleton from "@mui/material/Skeleton";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
var socket,chat;


function ChatArea() {
  
  const lightTheme = useSelector((state) => state.themeKey);
  const [messageContent, setMessageContent] = useState("");
  const [socketConnectionStatus,setSocketConnectionStatus] = useState(false);
  const messagesEndRef = useRef(null);
  const dyParams = useParams();
  const [chat_id, chat_user] = dyParams._id.split("&");
  // console.log(chat_id, chat_user);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const [allMessages, setAllMessages] = useState([]);
  const [allMessagesCopy, setAllMessagesCopy] = useState([]);
  // console.log("Chat area id : ", chat_id._id);
  // const refresh = useSelector((state) => state.refreshKey);
  const { refresh, setRefresh } = useContext(myContext);
  const [loaded, setloaded] = useState(false);
  const sendMessage = () => {
    var data = null;
    // console.log("SendMessage Fired to", chat_id._id);
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .post(
        "http://localhost:5000/message/",
        {
          content: messageContent,
          chatId: chat_id,
        },
        config
      )
      .then(({ response }) => {
        data = response;
        console.log("Message Fired");
      });
    socket.emit("new Message",data)
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup",userData);
    socket.on("connection",()=>{
      setSocketConnectionStatus(!socketConnectionStatus);
    })
  });

  useEffect(()=>{
    socket.on("message recieved",(newMessage)=>{
      if(!allMessagesCopy || allMessagesCopy._id !== newMessage._id){

      }else{
        setAllMessages([...allMessages],newMessage);
      }
    })
  })


  useEffect(() => {
    console.log("Users refreshed");
    const config = {
      headers: {
        Authorization: `Bearer ${userData.data.token}`,
      },
    };
    axios
      .get("http://localhost:5000/message/" + chat_id, config)
      .then(({ data }) => {
        setAllMessages(data);
        setloaded(true);
        socket.emit("join chat",chat_id);
        // console.log("Data from Acess Chat API ", data);
      });
      setAllMessagesCopy(allMessages);
    // scrollToBottom();
  }, [refresh, chat_id, userData.data.token, allMessages]);


  if (!loaded) {
    return (
      <div
        style={{
          border: "20px",
          padding: "10px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
        <Skeleton
          variant="rectangular"
          sx={{
            width: "100%",
            borderRadius: "10px",
            flexGrow: "1",
          }}
        />
        <Skeleton
          variant="rectangular"
          sx={{ width: "100%", borderRadius: "10px" }}
          height={60}
        />
      </div>
    );
  }
  else{return (
    <div className='Chatarea'>
        <div className={'chatname'+ ((lightTheme)?"":" dark")}>
          <p className='conv_icon'>{chat_user[0]}</p>
          <div className='header_text'>
            <p className='conv_name'>{chat_user}</p>
            {/* <p className='conv_timeStamp'>{props.timeStamp}</p> */}
          </div>
          <IconButton>
            <DeleteOutlineIcon/>
          </IconButton>
        </div>
        <div className={'messages'+ ((lightTheme)?"":" dark")}>
          {allMessages
            .slice(0)
            .map((message, index)=>{
              console.log(message)
              const sender = message.sender;
              const self_id = userData.data._id;
              if (sender._id === self_id) {
                console.log("I sent it ");
                return <MessageSelf props={message} key={index} />;
              } else {
                console.log("Someone Sent it");
                return <MessageOthers props={message} key={index} />;
              }
            })}
          </div>
          <div ref={messagesEndRef} className='BOTTOM'/>
          <div className={'text_input'+ ((lightTheme)?"":" dark")}>
            <input  placeholder='Type a message' className='search_box' value={messageContent} 
                    onChange={(e)=>{setMessageContent(e.target.value);}}></input>
            <IconButton
            onClick={() => {
              sendMessage();
              setRefresh(!refresh);
              console.log("Message content",messageContent);
            }}>
              <SendIcon/>
            </IconButton>
          </div>
    </div>
    );
  }
}

export default ChatArea