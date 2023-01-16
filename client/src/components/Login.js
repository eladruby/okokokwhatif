import React, {useState} from 'react';
import { Logo, Container , StyledLink, StyledInput, StyledButton, StyledErrMessage} from './styles/SingUp.style';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [LoginStatus, setLoginStatus] = useState("")
    const [UserDetailsValid, setUserDetailsValid] = useState(true)

    const login = () => {
        Axios.post('http://localhost:5000/login', { username: userName, password: password }).then((response) => {
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
            <StyledInput isValid={UserDetailsValid} placeholder={"Password"} type={"password"} onChange={(event) => {
                setPassword(event.target.value);
            }}/>
            <StyledButton onClick={login}>Login</StyledButton>
            <StyledLink onClick={() => {navigate("/signup")}}>Don't have an account yet?</StyledLink>
        </div>
    </Container>
  )
}

export default Login