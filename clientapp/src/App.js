import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Signupform from './pages/signupform/Signupform';
import Registerform from './pages/registerform/Registerform';
import Admin from './pages/admin/Admin';
import Addprod from './pages/addproduct/Addprod';
import Removeprod from './pages/removeprod/Removeprod';
import Modprod from './pages/modifyprod/Modprod';


function App() {
  return (
    <div>
    <BrowserRouter> 
    <Routes>
    <Route path="/" element={<Signupform/>} />
    <Route path="/register" element={<Registerform />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/addprod" element={<Addprod />} />
    <Route path="/removeprod" element={<Removeprod />} />
    <Route path="/modprod" element={<Modprod />} />
    </Routes>
    </BrowserRouter>
    
    {/* <Signupform></Signupform> */}
    </div>
  );
}

export default App;
