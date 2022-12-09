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
<<<<<<< Updated upstream
<<<<<<< Updated upstream
=======
import Admin from './pages/admin/Admin'
>>>>>>> Stashed changes

=======
import Admin from './pages/admin/Admin'
import Addprod from './pages/addproduct/Addprod'
import Removeprod from './pages/removeprod/Removeprod'
import Modprod from './pages/modifyprod/Modprod'
import Addcat from './pages/addcat/Addcat'
import Stock from './pages/stock/Stock'
// import Sales from './pages/admin/sales/Sales'
import Cart from './pages/Cart/Shopping_cart'
>>>>>>> Stashed changes

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
    <Route path="/admin" element={<Admin/>} />
    
    {/* <Route path="/useState" element={<useState/>} /> */}
    </Routes>
    </BrowserRouter>
    
    {/* <Signupform></Signupform> */}
    </div>
  );
}

export default App;
