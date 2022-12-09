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
  const [another,setanother]=useState("");
  // const stock=async (e)=>{
  //   axios.post('http://localhost:3002/stock',{  // add post to address)
  //   }).then(function (response){ 
  //     if (response) {
  //       console.log('here')
  //       setsales(response.data[0].product_id);
  //     } else {
  //       setsales(response.data[0].product_id);
  //     }
  //   })//calls post method API registration
  //}
    useEffect(() => {
        axios.get("http://localhost:3002/stock").then((response) => { //display current status
        console.log('here')
        console.log(response.data.result[0])    
        setsales(response.data.result[0].product_id);
        setanother(response.data.result[0].quantity);
        //setsales(response.data.result[1].product_id);

        });
        }, []);






  return (
    <>
     
      <MDBCard className='stock'>
        <MDBCardBody>
          <MDBCardTitle>See Stock which is going to end</MDBCardTitle>
          <MDBCardText>Check Stock levels.</MDBCardText>
          <div className='text-center text-md-start mt-4 pt-2'>
          <MDBCardText>Product ID.</MDBCardText>
           <h1>{sales}</h1>
           <MDBCardText>Quantity remaining</MDBCardText>
           <h1>{another}</h1>
          </div>
          {/* <MDBBtn className="mb-0 px-5" size='lg' onClick={sales}>Check Sales</MDBBtn> */}
        </MDBCardBody>
      </MDBCard>


    </>
  );
}

export default Stock;