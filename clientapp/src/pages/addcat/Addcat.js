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

const Addcat = () => {

    const navigate = useNavigate();

    const [category,setcat]=useState("");

    const addcat=async (e)=>{
        e.preventDefault(); // doesnt allow submission when field is empty
        axios.post('http://localhost:3002/addcat',{  // remove product
        category: category
    }).then(function (response){ 
        console.log(response);
    })//calls post method API registration


    }


    return (
        <MDBContainer className="Category">
    
          <MDBInput wrapperClass='mb-4' label='Category' id='form2' type='text'onChange={(e)=> setcat(e.target.value)}/>


    
          <MDBBtn className="mb-0 px-5" size='lg' onClick={addcat}>Add Category </MDBBtn>
    
        </MDBContainer>
      );

}
export default Addcat;