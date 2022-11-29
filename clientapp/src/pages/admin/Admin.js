import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from 'mdb-react-ui-kit';

import axios from "axios";
import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"



const Admin_pg = () => {

  const navigate = useNavigate();


  const addprod=async (e)=>{
    navigate('/addprod')
  }

  const addcar=async (e)=>{
    navigate('/register')
  }

  const stock=async (e)=>{
    navigate('/register')
  }

  const sales=async (e)=>{
    navigate('/register')
  }

  const remprod=async (e)=>{
    navigate('/register')
  }

  const modify=async (e)=>{
    navigate('/register')
  }




  return (
    <>
      <MDBCard className='addprod'>
        <MDBCardBody>
          <MDBCardTitle>Add Product</MDBCardTitle>
          <MDBCardText>Use this to add a new product to the inventory</MDBCardText>
          <MDBBtn className="mb-0 px-5" size='lg' onClick={addprod}>Add Product </MDBBtn>
        </MDBCardBody>
      </MDBCard>
      <br />
      <MDBCard className='addcat'>
        <MDBCardBody>
          <MDBCardTitle>Add a product category </MDBCardTitle>
          <MDBCardText>Add a product category.</MDBCardText>
          <MDBBtn className="mb-0 px-5" size='lg' onClick={addprod}>Add Product Category </MDBBtn>
        </MDBCardBody>
      </MDBCard>
      <br />
      <MDBCard className='remprod'>
        <MDBCardBody>
          <MDBCardTitle>Remove Product</MDBCardTitle>
          <MDBCardText>Remove an existing product.</MDBCardText>
          <MDBBtn className="mb-0 px-5" size='lg' onClick={remprod}>Remove Product </MDBBtn>
        </MDBCardBody>
      </MDBCard>
      <br />
      <MDBCard className='sales'>
        <MDBCardBody>
          <MDBCardTitle>See Total Sales</MDBCardTitle>
          <MDBCardText>Check out the total sales.</MDBCardText>
          <MDBBtn className="mb-0 px-5" size='lg' onClick={sales}>Check Sales</MDBBtn>
        </MDBCardBody>
      </MDBCard>
      <br />
      <MDBCard className='stock'>
        <MDBCardBody>
          <MDBCardTitle>Observe Stock Levels</MDBCardTitle>
          <MDBCardText>Check if some item is going to be out of stock.</MDBCardText>
          <MDBBtn className="mb-0 px-5" size='lg' onClick={stock}>Check Stock </MDBBtn>
        </MDBCardBody>
      </MDBCard>
      <br />
      <MDBCard className='modify'>
        <MDBCardBody>
          <MDBCardTitle>Modify a product</MDBCardTitle>
          <MDBCardText>Modify the price or quantity of a product.</MDBCardText>
          <MDBBtn className="mb-0 px-5" size='lg' onClick={modify}>Modify Stock </MDBBtn>
        </MDBCardBody>
      </MDBCard>


    </>
  );
}

export default Admin_pg;