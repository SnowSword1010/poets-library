import React, { useState } from 'react';
import Heading from "./components/Heading";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RhymingTool from "./components/RhymingTool";
import { render } from 'react-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
//import ReactDOM from 'react-dom';

function App() {

  const [technology, setTechnology] = useState("");
  
  function handleClick(e) {
    setTechnology(e.target.name)
    e.preventDefault();
  }
  
  function Body() {
    if (technology === "") {
      return (
        <Home></Home>
      )
    }
    else if (technology === "rhyme") {
      return (
        <RhymingTool></RhymingTool>
      )
    }
    else if (technology === "login") {
      return (
        <Login></Login>
      )
    }
    else if (technology === "signup") {
      return (
        <SignUp></SignUp>
      )
    }
  }
  return (
    <div>
      <div className="App">
        <Heading></Heading>
      </div>
      <Navbar handleClick = {handleClick}></Navbar>
      <Body></Body>
    </div>
  )
}
export default App;