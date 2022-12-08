import React, { useState } from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBIcon,
    MDBCheckbox
  }
  from 'mdb-react-ui-kit';
import axios from "axios";
import { useEffect} from "react";
import {useNavigate} from "react-router-dom"



const Forgotpassword = () => {
    const navigate = useNavigate();

    const [username,setusername]=useState("");
    const [oldpass,setoldpass]=useState("");
    const [newpass,setnewpass]=useState("");

    const [loginStatus, setLoginStatus] = useState("");


    const Back=async(e)=>{
        navigate('/')
    }
  

    const handlechange=async (e)=>{
        e.preventDefault(); // doesnt allow submission when field is empty
        axios.post('http://localhost:3002/changepassword',{  // add post to address  //admin login
        username: username,
        newpassword:newpass
    
        }).then(function (response){ 
          if (response.data.message) {
            setLoginStatus(response.data.message);
          } else {
            setLoginStatus(response.data[0].username);
          }
        })//calls post method API registration
    
      }
return(
    <div>
         <MDBContainer fluid>

<MDBRow className='d-flex justify-content-center align-items-center h-100'>
  <MDBCol col='12'>

    <MDBCard className='bg-white my-5 mx-auto' style={{borderRadius: '1rem', maxWidth: '500px'}}>
      <MDBCardBody className='p-5 w-100 d-flex flex-column'>

        <h2 className="fw-bold mb-2 text-center">Change your password here</h2>
        <p className="text-white-50 mb-3">Please enter your login and password!</p>

        <MDBInput wrapperClass='mb-4 w-100' label='Email' id='formControlLg' type='text' onChange={(e)=> setusername(e.target.value)} size="lg"/>
        <MDBInput wrapperClass='mb-4 w-100' label='New Password' id='formControlLg' type='password' onChange={(e)=> setnewpass(e.target.value)} size="lg"/>

        <div className="d-flex justify-content-between mb-4">
        <MDBBtn size='lg' onClick={handlechange}> Change Password </MDBBtn>

        
        <MDBBtn className="mb-0 px-5" size='lg' onClick={Back}>Back to Login </MDBBtn>
        </div>

      </MDBCardBody>
    </MDBCard>

  </MDBCol>
</MDBRow>

</MDBContainer>
    </div>
)

}

export default Forgotpassword