import React, {useState} from 'react';
import './SignUp.css';
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

    const signup = () => {
        let allGood = true
        if (passwordReg != reEnterPasswordReg){
            allGood = false
            setPasswordStatus("Passwords are not matching")
        } else{
            setPasswordStatus("")
        }
        if (!(emailReg.includes("@gmail.com")) || !(emailReg.length > 13)){
            allGood = false
            setEmailFormatStatus("Error, email doesn't exist")
        } else{
            setEmailFormatStatus("")
        }

        if(allGood){
            Axios.post('http://localhost:5000/signup', { firstname: firstNameReg, 
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
    <div className='App'>
        <div className='signup'>
            <h1>Sign Up</h1>
            <label>First Name</label>
            <input type={"text"} onChange={(event) => {
                setFirstNameReg(event.target.value);
            }}/>
            <label>Last Name</label>
            <input type={"text"} onChange={(event) => {
                setLastNameReg(event.target.value);
            }}/>
            <label>Username</label>
            <input type={"text"} onChange={(event) => {
                setUserNameReg(event.target.value);
            }}/>
            <label>Email</label>
            <input type={"email"} onChange={(event) => {
                setEmailReg(event.target.value);
            }}/>
            <h1>{EmailFormatStatus}</h1>
            <label>Password</label>
            <input type={"password"} onChange={(event) => {
                setPasswordReg(event.target.value);
            }}/>
            <label>Re-Enter Password</label>
            <input type={"password"} onChange={(event) => {
                setReEnterPasswordReg(event.target.value);
            }}/>
            <h1>{PasswordStatus}</h1>
            <h1>{SignUpStatus}</h1>
            <button onClick={signup}>Sign Up</button>
        </div>
    </div>
  )
}

export default SignUp