import React, {useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [LoginStatus, setLoginStatus] = useState("")
    const [UserDetailsValid, setUserDetailsValid] = useState(true)
    //Reveal Password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClick = (whichPassword) => {
      if (whichPassword === "originalPassword") setShowPassword(!showPassword);
      else setShowConfirmPassword(!showConfirmPassword);
    }

    const login = () => {
        Axios.post('http://localhost:5000/login', { username: userName.toLowerCase(), password: password }).then((response) => {
          if(response.data.length === 0){
            setLoginStatus("Wrong username or password")
            setUserDetailsValid(false)
          } else{
            setLoginStatus("Logged In")
            setUserDetailsValid(true)
            navigate('/profile/' + userName)
          }

        })
    };

    

  return (
    <div>
        <div>
            <div><img src='https://st2.depositphotos.com/3867453/6458/v/450/depositphotos_64580437-stock-illustration-letter-e-logo-icon-design.jpg' alt='logo'/></div>
            <div error={UserDetailsValid} value={LoginStatus}><h3>{LoginStatus}</h3></div>
            <input isValid={UserDetailsValid} placeholder={"Username"} type={"text"} onChange={(event) => {
                setUserName(event.target.value);
            }}/>
            <input isValid={UserDetailsValid} placeholder={"Password"} type={showPassword ? "text" : "password"} onChange={(event) => {
                setPassword(event.target.value);
            }}/>
            <span>
              <button onClick={() => handleClick("originalPassword")}></button>
            </span>
            <button onClick={login}>Login</button>
            <a onClick={() => {navigate("/signup")}}>Don't have an account yet?</a>
        </div>
    </div>
  )
}

export default Login