import React, {useState, useContext} from 'react'
import lockpc from  '../images/lock_pc.webp'
import {NavLink, useNavigate} from 'react-router-dom';
import { UserContext } from '../App';

const Login = () => {
  const {state, dispatch} = useContext(UserContext);

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) =>{
    e.preventDefault();

    const res = await fetch('/signin', {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email, password
        })
    });

    const data = await res.json();

    if(res.status === 400 || !data){
      window.alert("Invalid Credentials");
    } 
    else {
      dispatch({type:"USER", payload:true});
      window.alert("Login Successful");

      navigate('/');
    }
  }

  return (
   <>
    <section className='signin-section'>
        <div className='container'>
            <div className='card'>
              <div className="row">
                <div className="col-lg-6 col-md-12">
                    <div className="signin-fig">
                      <div className="work-img">
                        <img src={lockpc} alt="Working img" className='img-fluid'/>
                      </div>
                      <NavLink to="/signup" className='signin-img-link'>Create An Account</NavLink>
                    </div>
                  </div>
                  <div className='col-lg-6 col-md-12'>
                    <div className='inner-content'>
                    <h3>Sign In</h3>
                      <form method='POST' className='register-form'>

                        <div className='form-group'>
                          <label htmlFor="email">
                            <i class="zmdi zmdi-email"></i>
                          </label>
                          <input type="email" name='email' id='email' autoComplete='off' 
                             value={email}
                             onChange={(e) => setEmail(e.target.value)} placeholder='Your Email'/>
                        </div>

                        <div className='form-group'>
                          <label htmlFor="password">
                            <i class="zmdi zmdi-lock"></i>
                          </label>
                          <input type="password" name='password' id='password' autoComplete='off'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} placeholder='Password'/>
                        </div>

                        <div className='form-button'>
                            <input type="submit" name='signin' id='signin' className='form-submit'
                            onClick={loginUser}
                            value='Log In'/>
                        </div>

                      </form>
                    </div>
                  </div>
                  
                  </div>
                </div>
            </div>
        </section>
   </>
  )
}

export default Login