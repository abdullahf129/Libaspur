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
  backgroundColor: "black",
  padding: "10px",
  fontFamily: "Arial",
  boxAlign: "center",
};

const newstyle = {
  textAlign: "center",

  backgroundColor: "white",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  flexDirection: "column",
  padding: "10px",
  fontFamily: "Arial",
  boxAlign: "center",
};

const imgStyle = {
  color: "white",
  textAlign: "center",
  backgroundColor: "brown",
  padding: "10px",
  fontFamily: "Arial",
};

// https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?cs=srgb&dl=pexels-pixabay-35967.jpg&fm=jpg

const Gallery = () => {
  // export default function Gallery() {
  const [Images, setImages] = useState([]);
  const [selectedImg, setSelectedImage] = useState(null);
  const [searchData, setSearchData] = useState("");
  const [price, setPrice] = useState("");

  // function fetchData() {
  //   const fetchData = async () => {
  //     const resp = await axios.post("http://localhost:3002/gallery");
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
      const resp = await axios.post("http://localhost:3002/search", {
        searchData: searchData,
      });
      console.log("output: ", resp);
      var imageArr = {};
      for (var i = 0; i < resp["data"].length; i++) {
        // imageArr.push(resp["data"][i]["product_image"]);
        imageArr[i] = {
          name: resp["data"][i]["product_name"],
          image: resp["data"][i]["product_image"],
          price: resp["data"][i]["price"],
        };
      }
      setImages(imageArr);
    };
    try {
      fetchSearch();
    } catch (err) {
      console.log(err);
    }
  }
  function returnToGallery() {
    const fetchData = async () => {
      const resp = await axios.post("http://localhost:3002/gallery");
      var imageArr = {};
      for (var i = 0; i < resp["data"].length; i++) {
        // imageArr.push(resp["data"][i]["product_image"]);
        imageArr[i] = {
          name: resp["data"][i]["product_name"],
          image: resp["data"][i]["product_image"],
          price: resp["data"][i]["price"],
        };
      }
      setImages(imageArr);
    };
    try {
      fetchData();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const resp = await axios.post("http://localhost:3002/gallery");
      var imageArr = {};
      for (var i = 0; i < resp["data"].length; i++) {
        // imageArr.push(resp["data"][i]["product_image"]);
        imageArr[i] = {
          name: resp["data"][i]["product_name"],
          image: resp["data"][i]["product_image"],
          price: resp["data"][i]["price"],
        };
      }
      setImages(imageArr);
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
      <h3 style={mystyle}>Search the gallery</h3>

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
      <h4 style={mystyle}>Click on an image to add it to cart </h4>

      <br></br>
      <br></br>
      <div style={newstyle}>
        <button>View Shopping Cart</button>
      </div>

      <div className="container">
        <img src={selectedImg} className="selected" />
        <div style={imgStyle} className="imgContainer">
          {Object.keys(Images).map((key, i) => (
            <p key={i}>
              <img
                src={Images[key].image}
                // onClick={() => setImages(Images[key].image)}
              />
              <div> </div>
              <span> Product Name: {Images[key].name}</span> {"     "}
              <br></br>
              <span>
                {"       "} Product Price: {Images[key].price}
              </span>
            </p>
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
