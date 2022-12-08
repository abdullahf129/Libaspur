import React, { useState } from 'react'
import {MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';
import './signup.css'
import axios from "axios";
import { useEffect} from "react";
import {useNavigate} from "react-router-dom"



const Signupform = () => {
  const navigate = useNavigate();

  const [username,setusername]=useState("");
  const [password,setpassword]=useState("");

  const [loginStatus, setLoginStatus] = useState("");

  const newregister=async (e)=>{
    navigate('/register')
  }

  const forgotpassword=async(e)=>{
      navigate('/forgotpassword')
    
  }

  const handlelogincust=async (e)=>{
    e.preventDefault(); // doesnt allow submission when field is empty
    axios.post('http://localhost:3002/logincustomer',{  // add post to address
    username: username,
    password: password

  }).then(function (response){ 
    if (response.data.message) {
      setLoginStatus(response.data.message);
      if (response.data.message=="Welcome customer"){
        navigate('/gallery')
      }
    } else {
      setLoginStatus(response.data[0].username);
      navigate('/gallery')
    }
  })//calls post method API registration
  }

  const handleloginadmin=async (e)=>{
    e.preventDefault(); // doesnt allow submission when field is empty
    axios.post('http://localhost:3002/loginadmin',{  // add post to address  //admin login
    username: username,
    password: password

    }).then(function (response){ 
      if (response.data.message) {
        setLoginStatus(response.data.message);
      } else {
        setLoginStatus(response.data[0].username);
      }
    })//calls post method API registration

  }

  // useEffect(() => {
  //   axios.get("http://localhost:3002/login").then((response) => { //display current status
  //     if (response.data.loggedIn == true) {
  //       setLoginStatus(response.data.user[0].username);
  //     }
  //   });
  // }, []);

  return (
    <div>

<MDBContainer fluid className="p-3 my-5 h-custom">

<MDBRow>

  <MDBCol col='10' md='6'>
    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="Sample image" />
  </MDBCol>

  <MDBCol col='4' md='6'>

    <div className="d-flex flex-row align-items-center justify-content-center">

      <p className="lead fw-normal mb-0 me-3">Contact us here</p>

      <MDBBtn floating size='md' tag='a' className='me-2'>
        <MDBIcon fab icon='facebook-f' />
      </MDBBtn>

      <MDBBtn floating size='md' tag='a'  className='me-2'>
        <MDBIcon fab icon='twitter' />
      </MDBBtn>

      <MDBBtn floating size='md' tag='a'  className='me-2'>
       <MDBIcon fab icon='google' size="sm"/>
      </MDBBtn>

    </div>

    <div className="divider d-flex align-items-center my-4">
      <p className="text-center fw-bold mx-3 mb-0">Or</p>
    </div>

    <MDBInput wrapperClass='mb-4' label='Username ' id='formControlLg' type='text'onChange={(e)=> setusername(e.target.value)} size="lg"/>
    <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password'onChange={(e)=> setpassword(e.target.value)} size="lg"/>

    <div className="d-flex justify-content-between mb-4">
      <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
      <MDBBtn className="mb-0 px-5" size='lg' onClick={newregister}>Register Here </MDBBtn>
      <MDBBtn className="mb-0 px-5" size='lg' onClick={forgotpassword}>Forgot password </MDBBtn>
    </div>

    <div className='text-center text-md-start mt-4 pt-2'>
      <MDBBtn className="mb-0 px-5" size='lg' onClick={handlelogincust}>Sign in </MDBBtn>
    </div>


    <div className='text-center text-md-start mt-4 pt-2'>
      <MDBBtn className="mb-0 px-5" size='lg' onClick={handleloginadmin}>Sign in (Admin)</MDBBtn>
    </div>
  
    <div className='text-center text-md-start mt-4 pt-2'>
    <h1>{loginStatus}</h1>
    </div>

  </MDBCol>

</MDBRow>

<div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">

  <div className="text-white mb-3 mb-md-0">
    Copyright © 2020. All rights reserved.
  </div>

  <div>

    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white' }}>
      <MDBIcon fab icon='facebook-f' size="md"/>
    </MDBBtn>

    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
      <MDBIcon fab icon='twitter' size="md"/>
    </MDBBtn>

    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
      <MDBIcon fab icon='google' size="md"/>
    </MDBBtn>

    <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'white'  }}>
      <MDBIcon fab icon='linkedin-in' size="md"/>
    </MDBBtn>

  </div>

</div>

</MDBContainer>
    </div>
  )
}

export default Signupform