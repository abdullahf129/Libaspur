import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Navigate, redirect } from "react-router-dom";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";

// import Images from "./images";
const mystyle = {
  color: "white",
  textAlign: "center",
  backgroundColor: "DodgerBlue",
  padding: "10px",
  fontFamily: "Arial",
};

// https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?cs=srgb&dl=pexels-pixabay-35967.jpg&fm=jpg

const Gallery = () => {
  // export default function Gallery() {
  const [Images, setImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState(null);
  const [searchData, setSearchData] = useState("");

  // function fetchData() {
  //   const fetchData = async () => {
  //     const resp = await axios.post("http://localhost:3000/gallery");
  //     console.log(resp);
  //     const { data } = resp;
  //     const { result } = data;
  //     setImages(result);
  //   };
  //   try {
  //     fetchData();
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   // (<Search searchData={searchData} />)
  //   // navigate("/Search");
  //   //get images from server as a json array
  // }

  function fetchSearch() {
    const fetchSearch = async () => {
      // e.preventDefault();
      const resp = await axios.post("http://localhost:3000/search", {
        searchData: searchData,
      });
      console.log("output: ", resp);
      console.log(resp);
      const { data } = resp;
      const { result } = data;
      setImages(result);
      // const { data } = resp;
      // const { result } = data;
      // setImages(result);
    };
    try {
      fetchSearch();
    } catch (err) {
      console.log(err);
    }
  }
  function returnToGallery() {
    const fetchData = async () => {
      const resp = await axios.post("http://localhost:3000/gallery");
      console.log(resp);
      const { data } = resp;
      const { result } = data;
      setImages(result);
    };
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.post("http://localhost:3000/gallery");
      console.log(resp);
      const { data } = resp;
      const { result } = data;
      setImages(result);
    };
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    // n,
    <div className="App">
      <h1 style={mystyle}>Gallery</h1>
      <h6 style={mystyle}>Search the gallery</h6>

      <div>
        {" "}
        <input
          class="form-control"
          placeholder="search in lowercase: male kurta shalwar/ female kurta shalwar / male shalwar kameez / female shalwar kameez / male shalwar / female shalwar"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          type="search"
        ></input>
        <a>
          {" "}
          <button class="main-btn" type="submit" onClick={fetchSearch}>
            search
          </button>
        </a>
        <a>
          <button onClick={returnToGallery}> Back to Gallery</button>
        </a>
      </div>

      <br></br>
      <h2 style={mystyle}>All Items</h2>

      <div className="container">
        <img src={selectedImg} className="selected" />
        <div className="imgContainer">
          {Images.map((img, index) => (
            <img
              style={{
                border: selectedImg === img ? "4px solid purple" : "",
              }}
              key={index}
              src={img}
              // value={selectedImg}
              // // alt="dog"
              // onClick={() => setSelectedImg(img)}
            />
          ))}
        </div>
      </div>
      <br></br>
      <br></br>

      <br></br>
      <br></br>
    </div>
  );
};

export default Gallery;
