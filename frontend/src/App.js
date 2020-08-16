import React, { useState } from 'react';
import Heading from "./components/Heading";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RhymingTool from "./components/RhymingTool";
import { render } from 'react-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import LogInToContinue from "./components/LogInToContinue";
//import ReactDOM from 'react-dom';

function App() {

  // technology is a const that references the body element.
  // It's the value of technology that tells react which component to render.
  // The initial state of technology is set as an empty string. That represents the home page.
  const [technology, setTechnology] = useState("");

  // authentication is a constant that references the state of the user who is using the website.
  // It tells react whether the user is logged in or not using its isLoggedIn method
  // The authentication variable is passed to the auth attribute of the navbar component.
  const [authentication, setAuthentication] = useState({
    isLoggedIn: false,
    userObj: {
      firstName: null,
      lastName: null,
      email: null,
      password: null,
      data: null
    }
  });

  // The handleClick function is used to update the technology variable based on the user's clicked button on navbar
  function handleClick(e) {
    setTechnology(e.target.name)
    e.preventDefault();
  }

  // The handleAuthentication function is used to set the attributes of the user who successfully logs in.
  function handleAuthentication(obj) {
    setAuthentication({
      isLoggedIn: obj.data.isLoggedIn,
      userObj: {
        firstName: obj.data.firstName,
        lastName: obj.data.lastName,
        email: obj.data.email,
        password: obj.data.password,
        data: obj.data.data
      }
    })
  }

  function handleLogoutClick() {
    setAuthentication({
      isLoggedIn: false,
      userObj: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        data: null
      }
    })
  }

  function Body() {
    if (technology === "") {
      return (
        // renders the Home page
        <Home></Home>
      )
    }
    else if (technology === "rhyme") {
      if (authentication.isLoggedIn) {
        return (
          // renders the Rhyming Tool Page
          <RhymingTool></RhymingTool>
        )
      }
      else {
        return (
          <LogInToContinue></LogInToContinue>
        )
      }
    }
    else if (technology === "login") {
      return (
        // redners the Login Page
        <Login userLoggedIn={handleAuthentication}></Login>
      )
    }
    else if (technology === "signup") {
      return (
        // redners the SignUp Page
        <SignUp></SignUp>
      )
    }
  }
  return (
    <div>
      <div className="App">
        <Heading></Heading>
      </div>
      <Navbar handleClick={handleClick} auth={authentication} handleLogoutClick={handleLogoutClick}></Navbar>
      <Body></Body>
    </div>
  )
}
export default App;