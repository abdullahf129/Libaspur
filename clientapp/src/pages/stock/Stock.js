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



const Stock = () => {


  const navigate = useNavigate();

  const [sales, setsales] = useState("");

  const stock=async (e)=>{
    axios.post('http://localhost:3002/stock',{  // add post to address)
    }).then(function (response){
        console.log(response)
    })
    }

    useEffect(() => {
        axios.get("http://localhost:3002/stock").then((response) => { //display current status
            setsales(response.data.user[0].message);
        });
        }, []);
        





  return (
    <>
     
      <MDBCard className='sales'>
        <MDBCardBody>
          <MDBCardTitle>See Total Sales</MDBCardTitle>
          <MDBCardText>Check out the total sales.</MDBCardText>
          {/* <MDBBtn className="mb-0 px-5" size='lg' onClick={sales}>Check Sales</MDBBtn> */}
        </MDBCardBody>
      </MDBCard>


    </>
  );
}

export default Stock;