import React, {useState} from 'react';
// import './SignUp.css';
import { Container , StyledHeader, StyledLabel, StyledInput, StyledButton, StyledErrMessage} from './styles/SingUp.style';
import Axios from 'axios';

function SignUp() {
    const [firstNameReg, setFirstNameReg] = useState("");
    const [lastNameReg, setLastNameReg] = useState("");
    const [userNameReg, setUserNameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [reEnterPasswordReg, setReEnterPasswordReg] = useState("");
    const [SignUpStatus, setSignUpStatus] = useState("");
    const [EmailFormatStatus, setEmailFormatStatus] = useState("");
    const [PasswordStatus, setPasswordStatus] = useState("");
    const [userNameExist, setUserNameExist] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);

    const signup = async () => {

        let allGood = true
        if (passwordReg !== reEnterPasswordReg){
            allGood = false
            setPasswordStatus("Passwords are not matching")
            setIsPasswordValid(false)
        } else{
            setPasswordStatus("")
            setIsPasswordValid(true)
        }

        if (!(emailReg.includes("@gmail.com")) || !(emailReg.length > 13)){
            allGood = false
            setEmailFormatStatus("Email doesn't exist")
            setIsEmailValid(false)
        } else{
            setEmailFormatStatus("")
            setIsEmailValid(true)
        }

        const params = userNameReg
        if(allGood){
            await Axios.get(`http://localhost:5000/userexist/${params}`).then((response) => {
                console.log(response)
                if (response.data){
                    allGood = false
                    setUserNameExist("Username already exist")
                    setIsUsernameValid(false)
                } else{
                    setUserNameExist("")
                    setIsUsernameValid(true)
                } 
            }) 
        }

        if(allGood){
            await Axios.post('http://localhost:5000/signup', { firstname: firstNameReg, 
                                lastname: lastNameReg, 
                                username: userNameReg, 
                                email: emailReg, 
                                password: passwordReg }).then((response) => {
                                console.log(response) 
                                })
            setSignUpStatus("You've just Signed Up")
        } else {
            setSignUpStatus("Please check out your input")
        }
    };

  return (
    <Container>
        <div>
            <StyledHeader>
                <h1>Sign Up</h1>
            </StyledHeader>
            <StyledLabel>First Name</StyledLabel>
            <StyledInput isValid={true} type={"text"} onChange={(event) => {
                setFirstNameReg(event.target.value);
            }}/>
            <StyledLabel>Last Name</StyledLabel>
            <StyledInput isValid={true} type={"text"} onChange={(event) => {
                setLastNameReg(event.target.value);
            }}/>
            <StyledLabel>Username</StyledLabel>
            <StyledInput isValid={isUsernameValid} type={"text"} onChange={(event) => {
                setUserNameReg(event.target.value);
            }}/>
            <StyledErrMessage>{userNameExist}</StyledErrMessage>
            <StyledLabel>Email</StyledLabel>
            <StyledInput isValid={isEmailValid} type={"email"} onChange={(event) => {
                setEmailReg(event.target.value);
            }}/>
            <StyledErrMessage>{EmailFormatStatus}</StyledErrMessage>
            <StyledLabel>Password</StyledLabel>
            <StyledInput isValid={isPasswordValid} type={"password"} onChange={(event) => {
                setPasswordReg(event.target.value);
            }}/>
            <StyledLabel>Re-Enter Password</StyledLabel>
            <StyledInput isValid={isPasswordValid} type={"password"} onChange={(event) => {
                setReEnterPasswordReg(event.target.value);
            }}/>
            <StyledErrMessage>{PasswordStatus}</StyledErrMessage>
            <StyledHeader><h3>{SignUpStatus}</h3></StyledHeader>
            <StyledButton onClick={signup}>Sign Up</StyledButton>
        </div>
    </Container>
  )
}

export default SignUp