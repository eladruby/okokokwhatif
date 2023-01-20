import React, {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { Logo, Container , StyledLink, StyledInput, StyledButton, StyledErrMessage, ShowPasswordButton} from './styles/SingUp.style';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    //Values
    const [firstNameReg, setFirstNameReg] = useState("");
    const [lastNameReg, setLastNameReg] = useState("");
    const [userNameReg, setUserNameReg] = useState("");
    const [emailReg, setEmailReg] = useState("");
    const [passwordReg, setPasswordReg] = useState("");
    const [reEnterPasswordReg, setReEnterPasswordReg] = useState("");
    //Status
    const [SignUpStatus, setSignUpStatus] = useState("");
    const [EmailFormatStatus, setEmailFormatStatus] = useState("");
    const [PasswordStatus, setPasswordStatus] = useState("");
    //DB Checking
    const [userNameExist, setUserNameExist] = useState("");
    //Validation
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isUsernameValid, setIsUsernameValid] = useState(true);
    const [isError, setIsError] = useState(true);
    //Reveal Password
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleClick = (whichPassword) => {
        if (whichPassword === "originalPassword") setShowPassword(!showPassword);
        else setShowConfirmPassword(!showConfirmPassword);
    }

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
            setIsError(true)
        } else {
            setSignUpStatus("Please check out your input")
            setIsError(false)
        }
    };

    let navigate = useNavigate();
  return (
    <Container>
        <div>
            <Logo><img src='https://st2.depositphotos.com/3867453/6458/v/450/depositphotos_64580437-stock-illustration-letter-e-logo-icon-design.jpg' alt='logo'/></Logo>
            <StyledInput isValid={true} placeholder={"First Name"} type={"text"} onChange={(event) => {
                setFirstNameReg(event.target.value);
            }}/>
            <StyledInput isValid={true} placeholder={"Last Name"} type={"text"} onChange={(event) => {
                setLastNameReg(event.target.value);
            }}/>
            <StyledInput isValid={isUsernameValid} placeholder={"Username"} type={"text"} onChange={(event) => {
                setUserNameReg(event.target.value);
            }}/>
            <StyledErrMessage value={SignUpStatus}><h1>{userNameExist}</h1></StyledErrMessage>
            <StyledInput isValid={isEmailValid} placeholder={"Email"} type={"email"} onChange={(event) => {
                setEmailReg(event.target.value);
            }}/>
            <StyledErrMessage value={EmailFormatStatus}><h1>{EmailFormatStatus}</h1></StyledErrMessage>
            <StyledInput isValid={isPasswordValid} placeholder={"Password"} type={showPassword ? "text" : "password"} onChange={(event) => {
                setPasswordReg(event.target.value);
            }}/>
            <ShowPasswordButton onClick={() => handleClick("originalPassword")}><FontAwesomeIcon icon={faEyeSlash} /></ShowPasswordButton>
        
            <StyledInput isValid={isPasswordValid} placeholder={"Confirm Password"} type={showConfirmPassword ? "text" : "password"} onChange={(event) => {
                setReEnterPasswordReg(event.target.value);
            }}/>
            <ShowPasswordButton onClick={() => handleClick("confirmPassword")}><FontAwesomeIcon icon={faEyeSlash} /></ShowPasswordButton>
            <StyledErrMessage><h1>{PasswordStatus}</h1></StyledErrMessage>
            <StyledErrMessage error={isError} value={SignUpStatus}><h3>{SignUpStatus}</h3></StyledErrMessage>
            <StyledButton onClick={signup}>Sign Up</StyledButton>
            <StyledLink onClick={() => {navigate('/login')}}>Already have an account?</StyledLink>
        </div>
    </Container>
  )
}

export default SignUp