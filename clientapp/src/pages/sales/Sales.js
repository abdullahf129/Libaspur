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



const Sales = () => {


  const navigate = useNavigate();

  const [sales, setdate] = useState([]);
  // const stock=async (e)=>{
  //   axios.post('http://localhost:3002/stock',{  // add post to address)
  //   }).then(function (response){ 
  //     if (response) {
  //       console.log('here')
  //       setdate(response.data[0].date);
  //     } else {
  //       setdate(response.data[0].date);
  //     }
  //   })//calls post method API registration
  //}
    useEffect(() => {
        axios.get("http://localhost:3002/sales").then((response) => { //display current status
        console.log('here')
        console.log(response.data.result[0])    
        setdate(response.data.result);
        //setdate(response.data.result[1].date);

        });
        }, []);






  return (
    <>
     
      <MDBCard className='sales'>
        <MDBCardBody>
          <MDBCardTitle>Sales Report</MDBCardTitle>
          <MDBCardText>Check the daily sales below</MDBCardText>
          <div className='text-center text-md-start mt-4 pt-2'>
          {sales.map((user) => (
          <div className='text-center text-md-start mt-4 pt-2'>Date={user.date} , Amount={user.total}</div>
          ))}
          </div>
          {/* <MDBBtn className="mb-0 px-5" size='lg' onClick={sales}>Check Sales</MDBBtn> */}
        </MDBCardBody>
      </MDBCard>


    </>
  );
}

export default Sales;