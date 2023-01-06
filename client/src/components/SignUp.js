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

    const signup = () => {
        Axios.post('http://localhost:5000/signup', { firstname: firstNameReg, 
                                lastname: lastNameReg, 
                                username: userNameReg, 
                                email: emailReg, 
                                password: passwordReg }).then((response) => {
                                console.log(response) 
                                })
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
            <label>Password</label>
            <input type={"password"} onChange={(event) => {
                setPasswordReg(event.target.value);
            }}/>
            <label>Re-Enter Password</label>
            <input type={"password"} onChange={(event) => {
                setReEnterPasswordReg(event.target.value);
            }}/>
            <button onClick={signup}>Sign Up</button>
        </div>
    </div>
  )
}

export default SignUp