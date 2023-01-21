import React, {useState} from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField'

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

    function titleCase(str) {
        return str.split(' ').map(item => 
               item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(' ');
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
            await Axios.post('http://localhost:5000/signup', { firstname: titleCase(firstNameReg), 
                                lastname: titleCase(lastNameReg), 
                                username: userNameReg.toLocaleLowerCase(), 
                                email: emailReg.toLocaleLowerCase(), 
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
    <div>
        <div><img src='https://st2.depositphotos.com/3867453/6458/v/450/depositphotos_64580437-stock-illustration-letter-e-logo-icon-design.jpg' alt='logo'/></div>
        <TextField id="outlined-basic" label="First Name" variant="outlined" isValid={true} type={"text"} onChange={(event) => {
            setFirstNameReg(event.target.value);
        }}/>
        <TextField id="outlined-basic" label="Last Name" variant="outlined" isValid={true} type={"text"} onChange={(event) => {
            setLastNameReg(event.target.value);
        }}/>
        <TextField id="outlined-basic" label="Username" variant="outlined" isValid={isUsernameValid} type={"text"} onChange={(event) => {
            setUserNameReg(event.target.value);
        }}/>
        <div value={SignUpStatus}><h1>{userNameExist}</h1></div>
        <TextField id="outlined-basic" label="Email" variant="outlined" isValid={isEmailValid} type={"email"} onChange={(event) => {
            setEmailReg(event.target.value);
        }}/>
        <div value={EmailFormatStatus}><h1>{EmailFormatStatus}</h1></div>
        <TextField id="outlined-basic" label="Password" variant="outlined" isValid={isPasswordValid} type={showPassword ? "text" : "password"} onChange={(event) => {
            setPasswordReg(event.target.value);
        }}/>
        <button onClick={() => handleClick("originalPassword")}></button>
    
        <TextField id="outlined-basic" label="Confirm Password" variant="outlined" isValid={isPasswordValid} type={showConfirmPassword ? "text" : "password"} onChange={(event) => {
            setReEnterPasswordReg(event.target.value);
        }}/>
        <button onClick={() => handleClick("confirmPassword")}></button>
        <div><h1>{PasswordStatus}</h1></div>
        <div error={isError} value={SignUpStatus}><h3>{SignUpStatus}</h3></div>
        <button onClick={signup}>Sign Up</button>
        <href onClick={() => {navigate('/login')}}>Already have an account?</href>
    </div>
  )
}

export default SignUp