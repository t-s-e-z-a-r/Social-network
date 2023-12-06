// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home/Home';
import SignIn from './Routes/Login/SignIn';
import MyAccount from './Routes/MyAccount/Myaccount';
import SignUp from './Routes/Registration/SignUp';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signUp" element={<SignUp/>} />
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/myaccount" element={<MyAccount />} />
      </Routes>
    </>
  );
}

export default App;
