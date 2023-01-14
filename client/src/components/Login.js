import React, {useState} from 'react';
import { Container , StyledHeader, StyledLabel, StyledInput, StyledButton} from './styles/SingUp.style'
import Axios from 'axios';

function Login() {
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
          }
        })
    };

  return (
    <Container>
        <div className='login'>
            <StyledHeader>
              <h1>Login</h1>
            </StyledHeader>
            <StyledLabel>Username</StyledLabel>
            <StyledInput isValid={UserDetailsValid} type={"text"} onChange={(event) => {
                setUserName(event.target.value);
            }}/>
            <StyledLabel>Password</StyledLabel>
            <StyledInput isValid={UserDetailsValid} type={"password"} onChange={(event) => {
                setPassword(event.target.value);
            }}/>
            <StyledButton onClick={login}>Login</StyledButton>
            <h3>{LoginStatus}</h3>
        </div>
    </Container>
  )
}

export default Login