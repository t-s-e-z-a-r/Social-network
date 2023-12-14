// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './Components/Header';
import Home from './Routes/Home/Home';
import SignIn from './Routes/Login/SignIn';
import MyAccount from './Routes/MyAccount/Myaccount';
import SignUp from './Routes/Registration/SignUp';
import Navigation from './Components/Nav';
import Posts from './Routes/Posts/Posts';
import About from './Routes/About/About';


function App() {
  return (
    <>
      <Header />
      <div style={{ display: 'flex' }}>
        <div style={{ width: '200px', borderRight: '1px solid #ccc' }}>
          <Navigation />
        </div>
        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/signIn" element={<SignIn />} />
            <Route path="/myaccount" element={<MyAccount />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </>
  );
}


export default App;
