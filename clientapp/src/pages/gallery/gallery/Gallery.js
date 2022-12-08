import React, { useState /*, useEffect*/ } from "react";
import axios from "axios";

import Images from "./images";
const mystyle = {
  color: "white",
  textAlign: "center",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial",
};

// https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?cs=srgb&dl=pexels-pixabay-35967.jpg&fm=jpg

// function fetchImages(){

//     //get images from server as a json array
//     setImages(Images);
// }


export default function gallery() {
  // const [images, setImages] = useState([]);

  //   useEffect(() => {
  //     console.log("useEffect");

  //   }, []);

  const n = axios.get("http://localhost:3002/homepage").then((response) => {
    console.log(response);
  });

  const [selectedImg, setSelectedImg] =(Images[0]);
  return ( 
    // <div>
    //   <img src={n} alt="Selected" className="selected" />
      
    // </div>
    n,
    (
      <div className="App">
        <h1 style={mystyle}>Gallery</h1>
        <h2 style={mystyle}>Male Kurtas</h2>

        <div className="container">
          {/* <img src={selectedImg} alt="Selected" className="selected" /> */}
          <div className="imgContainer">
            {Images.map((img, index) => (
              <img
                style={{
                  border: selectedImg === img ? "4px solid purple" : "",
                }}
                key={index}
                src={img}
                alt="dog"
                onClick={() => setSelectedImg(img)}
              />
            ))}
          </div>
        </div>
        <br></br>
        <br></br>

        <br></br>
        <br></br>

        <h2 style={mystyle}>Female Kurtas</h2>
        <br></br>
        <br></br>
        <div className="container">
          {/* <img src={selectedImg} alt="Selected" className="selected" /> */}
          <div className="imgContainer">
            {Images.map((img, index) => (
              <img
                style={{
                  border: selectedImg === img ? "4px solid purple" : "",
                }}
                key={index}
                src={img}
                alt="dog"
                onClick={() => setSelectedImg(img)}
              />
            ))}
          </div>
        </div>
      </div>
    )
  );
}

// export default gallery;
