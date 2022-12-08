import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import { useState } from 'react';

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
}
 from "react-router-dom";
import Signupform from './pages/signupform/Signupform';
import Registerform from './pages/registerform/Registerform'
import Gallery from './pages/gallery/gallery/Gallery'
import Images from './pages/gallery/gallery/images'
import Forgotpassword from './pages/forgotpassword/Forgotpassword'


function App() {
  return (
    <div>
    <BrowserRouter> 
    <Routes>
    <Route path="/" element={<Signupform/>} />
    <Route path="/register" element={<Registerform />} />
    <Route path="/gallery" element={<Gallery/>} />
    <Route path="/forgotpassword" element={<Forgotpassword/>} />
    <Route path="/images" element={<Images/>} />
    <Route path="/homepage" element={<Gallery/>} />
    {/* <Route path="/useState" element={<useState/>} /> */}
    </Routes>
    </BrowserRouter>
    
    {/* <Signupform></Signupform> */}
    </div>
  );
}

export default App;
