import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Logo, Container , StyledLink, StyledInput, StyledButton, StyledErrMessage, ShowPasswordButton3} from './styles/SingUp.style';
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
    <Container>
        <div>
            <Logo><img src='https://st2.depositphotos.com/3867453/6458/v/450/depositphotos_64580437-stock-illustration-letter-e-logo-icon-design.jpg' alt='logo'/></Logo>
            <StyledErrMessage error={UserDetailsValid} value={LoginStatus}><h3>{LoginStatus}</h3></StyledErrMessage>
            <StyledInput isValid={UserDetailsValid} placeholder={"Username"} type={"text"} onChange={(event) => {
                setUserName(event.target.value);
            }}/>
            <StyledInput isValid={UserDetailsValid} placeholder={"Password"} type={showConfirmPassword ? "text" : "password"} onChange={(event) => {
                setPassword(event.target.value);
            }}/>
            <span>
              <ShowPasswordButton3 onClick={() => handleClick("originalPassword")}><FontAwesomeIcon icon={faEyeSlash} /></ShowPasswordButton3>
            </span>
            <StyledButton onClick={login}>Login</StyledButton>
            <StyledLink onClick={() => {navigate("/signup")}}>Don't have an account yet?</StyledLink>
        </div>
    </Container>
  )
}

export default Login