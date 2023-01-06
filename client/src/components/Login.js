import React, {useState} from 'react';
import './Login.css';
import Axios from 'axios';

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [LoginStatus, setLoginStatus] = useState("")

    const login = () => {
        Axios.post('http://localhost:5000/login', { username: userName, password: password }).then((response) => {
          if(response.data.length == 0){
            setLoginStatus("Wrong username or password")
          } else{
            setLoginStatus("Logged In")
          }
        })
    };

  return (
    <div className='App'>
        <div className='login'>
            <h1>Login</h1>
            <label>Username</label>
            <input type={"text"} onChange={(event) => {
                setUserName(event.target.value);
            }}/>
            <label>Password</label>
            <input type={"password"} onChange={(event) => {
                setPassword(event.target.value);
            }}/>
            <button onClick={login}>Login</button>
            <h1>{LoginStatus}</h1>
        </div>
    </div>
  )
}

export default Login