import { Button, TextField} from '@mui/material'
import React,{useState} from 'react'
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {Backdrop, CircularProgress,Alert} from "@mui/material";
import Toaster from './Toaster';

function LoginPage() {
    
    const [showlogin, setShowlogin] = useState(false);
    const [data, setData] = useState({name: "",email: "",password: ""});
    const [loading, setLoading] = useState(false); 
    const handleClose = () => {
        setLoading(false);
    };
    const handleOpen = () => {
        setLoading(true);
    };
    const [logInStatus,setLogInStatus] = React.useState("");
    const [signInStatus,setSignInStatus] = React.useState("");

    const navigate = useNavigate();

    const changeHandler = (e) =>{
        setData({...data,[e.target.name]: e.target.value});
    };

   
    
    const loginHandler = async (e) => {
        setLoading(true);
        console.log(data);
        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const response = await axios.post(
                "http://localhost:5000/user/login/",
                data,
                config
            );
            console.log("Login: ",response);
            setLogInStatus({msg:"Success",key: Math.random()});
            localStorage.clear();
            setLoading(false);
            localStorage.setItem("userData",JSON.stringify(response));
            navigate("/app/welcome");
        }
        catch(error){
            setLogInStatus({
                msg : "Invalid User name or password",
                key : Math.random(),
            });
        }
        setLoading(false);
    };


    const signUpHandler = async () => {
        setLoading(true);
        try{
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };
            const response = await axios.post(
                "http://localhost:5000/user/sign-up/",
                data,
                config
            );
            console.log(response);
            setLogInStatus({msg:"Success",key: Math.random()});
            setLoading(false);
            localStorage.setItem("userData",JSON.stringify(response));
        }catch(error){
            
                setSignInStatus({
                msg : "User Already already exists",
                key : Math.random(),
            });
            setLoading(false);
        }
    };
  return (
    <>
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
            onClick={handleClose}
            >
            <CircularProgress color="inherit" />
        </Backdrop>
        <div className='Login-cont'>
            <div className='Login-logo'>
                <img src='chat.png' className='Login-image'/>
                <p className='Login-text'>Login to the application</p>
            </div>
            {showlogin && (
                <div className='Login-input'>
                <div className='Login-cred'>
                    <h1 className='Login-text'>Enter the credentials</h1>
                    <TextField
                        onChange={changeHandler}
                        id='standard-basic'
                        label = 'Enter username'
                        variant='outlined'
                        name="name"
                        helperText = ""
                    />
                    <TextField
                        onChange={changeHandler}
                        id='outlined-password-input'
                        label = 'Enter password'
                        type='password'
                        autoComplete='current-password'
                        name="password"
                    />
                    <Button variant='contained' onClick={()=>{loginHandler();handleOpen()}}>Login</Button>
                </div>
                <p className='Login-text-Under'>Dont have and account? {" "}
                    <span
                        className='hyper'
                        onClick = {()=>{
                            setShowlogin(false);
                        }}
                    >
                        sign up 
                    </span>
                </p>
                {logInStatus?(
                    <Toaster key={logInStatus.key} message={logInStatus.msg}/>
                ): null}
                </div>
            )}
            {!showlogin && (
            <div className='Login-input'>
                <div className='Login-cred'>
                    <h1 className='Login-text'>Enter the credentials</h1>
                    <TextField
                        onChange={changeHandler}
                        id='standard-basic'
                        label = 'Enter username'
                        variant='outlined'
                        name="name"
                        helperText = ""
                    />
                    <TextField
                        onChange={changeHandler}
                        id='standard-basic'
                        label = 'Enter Valid Email'
                        variant='outlined'
                        name="email"
                    />
                    <TextField
                        onChange={changeHandler}
                        id='outlined-password-input'
                        label = 'Enter password'
                        type='password'
                        autoComplete='current-password'
                        name="password"
                    />
                    <Button variant='contained' onClick={()=>{signUpHandler();handleOpen()}}>SignUp</Button>
                </div>
                <p className='Login-text-Under'>Already have and account? {" "}
                    <span
                        className='hyper'
                        onClick = {()=>{
                            setShowlogin(true);
                        }}
                    >
                        login 
                    </span>
                </p>
                {signInStatus?(
                    <Toaster key={signInStatus.key} message={signInStatus.msg}/>
                ): null}
            </div>
            )}
        </div>
    </>
  )
}

export default LoginPage