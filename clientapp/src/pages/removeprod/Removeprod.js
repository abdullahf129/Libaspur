import React from 'react';
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
} from 'mdb-react-ui-kit';



import axios from "axios";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"

const Removeprod = () => {

    const navigate = useNavigate();

    const [prodid,setprodid]=useState("");

    const remprod=async (e)=>{
        e.preventDefault(); // doesnt allow submission when field is empty
        axios.post('http://localhost:3002/removeprod',{  // remove product
        prodid: prodid
    }).then(function (response){ 
        console.log(response);
    })//calls post method API registration


    }


    return (
        <MDBContainer className="remprod">
    
          <MDBInput wrapperClass='mb-4' label='Product_id' id='form2' type='text'onChange={(e)=> setprodid(e.target.value)}/>


    
          <MDBBtn className="mb-0 px-5" size='lg' onClick={remprod}>Remove </MDBBtn>
    
        </MDBContainer>
      );

}
export default Removeprod;