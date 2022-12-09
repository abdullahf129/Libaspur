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


    const [stock, setstock] = useState("");

    const navigate = useNavigate();

    const [prodid,setprodid]=useState("");

    const [sales, setsales] = useState([]);

    

    const ob_stock=async (e)=>{
        e.preventDefault(); // doesnt allow submission when field is empty
        axios.post('http://localhost:3002/observestock',{  
        prodid: prodid
    }).then(function (response){ 
        console.log(response);
    })//calls post method API registration

    }

    


    useEffect(() => {
        axios.get("http://localhost:3002/observe_sales").then((response) => { //display current status
        console.log('here')
        console.log(response.data.result[0])    
        // setdate(response.data.result);
        setstock(response.data.result);
        //setdate(response.data.result[1].date);

        });
        }, []);
    


    


    return (
        <MDBContainer className="observe">
    
          <MDBInput wrapperClass='mb-4' label='Product_id' id='form2' type='text'onChange={(e)=> setprodid(e.target.value)}/>
    
          <MDBBtn className="mb-0 px-5" size='lg' onClick={ob_stock}>Check Stock </MDBBtn>


          <div className="text-center text-md-start mt-4 pt-2">
              <h1>Stock level: {stock}</h1>
              {/* <h1>Customer: {loginStatuscust}</h1> */}
        </div>


    
        </MDBContainer>

        





      );

}
export default Observe;