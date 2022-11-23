import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import Signupform from './pages/signupform/Signupform';
import Registerform from './pages/registerform/Registerform'


function App() {
  return (
    <div>
    <BrowserRouter> 
    <Routes>
    <Route path="/login" element={<Signupform/>} />
    <Route path="/register" element={<Registerform />} />
    </Routes>
    </BrowserRouter>
    
    {/* <Signupform></Signupform> */}
    </div>
  );
}

export default App;
