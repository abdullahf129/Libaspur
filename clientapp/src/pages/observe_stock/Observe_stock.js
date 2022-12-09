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

const Observe = () => {

    const navigate = useNavigate();

    const [prodid,setprodid]=useState("");

    const ob_stock=async (e)=>{
        e.preventDefault(); // doesnt allow submission when field is empty
        axios.post('http://localhost:3002/observe_stock',{  // remove product
        prodid: prodid
    }).then(function (response){ 
        console.log(response);
    })//calls post method API registration


    }


    return (
        <MDBContainer className="observe">
    
          <MDBInput wrapperClass='mb-4' label='Product_id' id='form2' type='text'onChange={(e)=> setprodid(e.target.value)}/>
    
          <MDBBtn className="mb-0 px-5" size='lg' onClick={ob_stock}>Check Stock </MDBBtn>
    
        </MDBContainer>
      );

}
export default Observe;