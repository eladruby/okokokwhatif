import React from 'react'
import {BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignUp from './components/SignUp'
import Login from './components/Login'
import ErrorPage from './components/ErrorPage';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Routes >
        
        <Route path='/' element={<Navigate to='login' />}/>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/profile/:username' element={<Profile />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes >
    </Router>
  )
}

export default App