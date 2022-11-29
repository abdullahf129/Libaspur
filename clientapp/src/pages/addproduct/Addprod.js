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

const Addprod = () => {

    const navigate = useNavigate();

    const [prodname,setprodname]=useState("");
    const [prodprice,setprodprice]=useState("");
    const [prodcat,setprodcat]=useState("");
    const [prodimg,setprodimg]=useState("");
    const [prodid,setprodid]=useState("");


    const addprod=async (e)=>{
        e.preventDefault(); // doesnt allow submission when field is empty
        axios.post('http://localhost:3002/addprod',{  // add post to address
        prodname: prodname,
        prodprice: prodprice,
        prodcat: prodcat,
        prodimg: prodimg,
        prodid: prodid
    }).then(function (response){ 
        console.log(response);
    })//calls post method API registration


    }

    
    return (
        <MDBContainer className="addprod">
    
          <MDBInput wrapperClass='mb-4' label='Product Name' id='form1' type='text'onChange={(e)=> setprodname(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Product_id' id='form2' type='text'onChange={(e)=> setprodid(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Product Price' id='form3' type='text'onChange={(e)=> setprodprice(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Product Category' id='form3' type='text'onChange={(e)=> setprodcat(e.target.value)}/>
          <MDBInput wrapperClass='mb-4' label='Product Image' id='form3' type='text'onChange={(e)=> setprodimg(e.target.value)}/>


    
          <MDBBtn className="mb-0 px-5" size='lg' onClick={addprod}>Add </MDBBtn>
    

    
        </MDBContainer>
      );

}
export default Addprod;
