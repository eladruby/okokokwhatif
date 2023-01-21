import React, {useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {TextField, Box, Typography, Button } from '@mui/material';

function Login() {

    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [LoginStatus, setLoginStatus] = useState("")

    // const handleClick = (whichPassword) => {
    //   if (whichPassword === "originalPassword") setShowPassword(!showPassword);
    //   else setShowConfirmPassword(!showConfirmPassword);
    // }

    const login = async () => {
        await Axios.post('http://localhost:5000/login', { username: userName.toLowerCase(), password: password }).then((response) => {
          if(response.data.length === 0){
            setLoginStatus("Wrong username or password")
          } else{
            setLoginStatus("Logged In")
            navigate('/profile/' + userName)
          }

        })
    };


  return (

    /* <div><img src='https://st2.depositphotos.com/3867453/6458/v/450/depositphotos_64580437-stock-illustration-letter-e-logo-icon-design.jpg' alt='logo'/></div>
    <div error={UserDetailsValid} value={LoginStatus}><h3>{LoginStatus}</h3></div> */
    // <TextField fullWidth  id="fullWidth" label="Username" isValid={UserDetailsValid} onChange={(event) => {
    //     setUserName(event.target.value);
    // }}/>
    // <TextField fullWidth id="fullWidth" label="Password" isValid={UserDetailsValid} onChange={(event) => {
    //     setPassword(event.target.value);
    // }}/>
    /* 
    <button onClick={() => handleClick("originalPassword")}></button>
    {/* <button onClick={login}>Login</button>
    <href onClick={() => {navigate("/signup")}}>Don't have an account yet?</href>    */
    <div>
      <form>
        <Box display='flex' flexDirection={"column"} maxWidth={360} alignItems='center' justifyContent={'center'} margin="auto" marginTop={5} padding={5}>
          <img  style={{ width: '150px', height: '150px' }} src='https://st2.depositphotos.com/3867453/6458/v/450/depositphotos_64580437-stock-illustration-letter-e-logo-icon-design.jpg' alt='logo'/>
          
          <TextField style={{marginBottom: '10px'}} fullWidth label="Username" id="Username" type={"text"} onChange={(event) => {setUserName(event.target.value)}} />
          <TextField style={{marginTop: '10px'}} fullWidth label="Password" id="Password" type={"password"} onChange={(event) => {setPassword(event.target.value)}} />
          <Button variant="contained" color='secondary' style={{marginTop: '20px'}} onClick={login}>Login</Button>
          <Typography variant='h6' style={{color: 'red', marginTop: '20px'}} textAlign='center'>{LoginStatus}</Typography>
          <Typography style={{cursor: 'pointer', marginTop: '20px'}} fontSize={16} textAlign='center' onClick={() => {navigate("/signup")}}>Don't have an account yet?</Typography>
        </Box>
      </form>
    </div>
  )
}

export default Login