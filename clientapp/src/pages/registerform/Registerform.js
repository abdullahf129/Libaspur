import React from 'react'
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon
  }
  from 'mdb-react-ui-kit';

import axios from "axios";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"

const Registerform = () => {

    const navigate = useNavigate();

    const moveback=async (e)=>{
        navigate('/')
      }

    const [username,setusername]=useState("");
    const [password,setpassword]=useState("");
    const [email,setmail]=useState("");
    const [name,setname]=useState("");
    const [address,setaddress]=useState("");
    const [number,setnumber]=useState("");
       
    const [singupStatus, setsignupStatus] = useState("");

    const newregister=async (e)=>{
        e.preventDefault(); // doesnt allow submission when field is empty
        axios.post('http://localhost:3002/register',{  // add post to address
        username: username,
        password: password,
        email:email,
        name: name,
        address: address,
        number: number
        }).then(function (response){console.log(response)})        
      }

      useEffect(() => {
        axios.get("http://localhost:3002/register").then((response) => { //display current status
            setsignupStatus(response.data.user[0].message);
        });
      }, []);
    

  return (
    <div>
<MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>

<MDBRow>

  <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

    <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(218, 81%, 95%)'}}>
      The best offer <br />
      <span style={{color: 'hsl(218, 81%, 75%)'}}>Libaspur</span>
    </h1>

    <p className='px-3' style={{color: 'hsl(218, 81%, 85%)'}}>
        THE ONE KIND OF PLACE TO BUY YOUR ALL KIND OF CLOTHES.
    </p>

  </MDBCol>

  <MDBCol md='6' className='position-relative'>

    <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
    <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

    <MDBCard className='my-5 bg-glass'>
      <MDBCardBody className='p-5'>


          <MDBCol col='6'>
            <MDBInput wrapperClass='mb-4' label='Username' id='formControlLg' type='text'onChange={(e)=> setusername(e.target.value)}/>
          </MDBCol>


        <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password'onChange={(e)=> setpassword(e.target.value)}/>
        <MDBInput wrapperClass='mb-4' label='Email' id='formControlLg' type='email'onChange={(e)=> setmail(e.target.value)}/>
        <MDBInput wrapperClass='mb-4' label='First Name' id='formControlLg' type='text'onChange={(e)=> setname(e.target.value)}/>
        <MDBInput wrapperClass='mb-4' label='House Address' id='formControlLg' type='text'onChange={(e)=> setaddress(e.target.value)}/>
        <MDBInput wrapperClass='mb-4' label='Phone number' id='formControlLg' type='text'onChange={(e)=> setnumber(e.target.value)}/>

        <MDBBtn className='w-100 mb-4' size='md'onClick={newregister}>sign up</MDBBtn>
        <MDBBtn className='w-100 mb-4' size='md'onClick={moveback}>Back to login</MDBBtn>


        <div className='text-center text-md-start mt-4 pt-2'>
        <h1>{singupStatus}</h1>
        </div>

        <div className="text-center">

          <p>Contact us on: </p>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm"/>
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm"/>
          </MDBBtn>


        </div>

      </MDBCardBody>
    </MDBCard>

  </MDBCol>

</MDBRow>

</MDBContainer>


    </div>
  )
}

export default Registerform