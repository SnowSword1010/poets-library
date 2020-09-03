import React, { useState } from 'react';
import Heading from "./components/Heading";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RhymingTool from "./components/RhymingTool";
import { render } from 'react-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import LogInToContinue from "./components/LogInToContinue";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import NewPoetry from './components/NewPoetry';
import PenName from './components/PenName';

function App() {

  // authentication is a constant that references the state of the user who is using the website.
  // It tells react whether the user is logged in or not using its isLoggedIn method
  // The authentication variable is passed to the auth attribute of the navbar component.
  let [authentication, setAuthentication] = useState({
    isLoggedIn: false,
    poetObj: {
      penName: null,
      fName: null,
      lName: null,
      email: null,
    }
  });

  // The handleAuthentication function is used to set the attributes of the user who successfully logs in.
  function handleAuthentication(obj) {
    setAuthentication({
      isLoggedIn: obj.isLoggedIn,
      poetObj: {
        penName: obj.peName,
        fName: obj.fName,
        lName: obj.lName,
        email: obj.email
      }
    })
  }

  function handleLogoutClick() {
    setAuthentication({
      isLoggedIn: false,
      poeObj: {
        penName: null,
        fName: null,
        lName: null,
        email: null
      }
    })
  }
  if (authentication.isLoggedIn == true) {
    return (
      <Router>
        <div>
          <div className="App">
            <Heading></Heading>
          </div>
          <Navbar auth={authentication} handleLogoutClick={handleLogoutClick}></Navbar>
          <Route exact path="/login">
            <Login userLoggedIn={handleAuthentication}></Login>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/rhymingtool">
            <RhymingTool></RhymingTool>
          </Route>
          <Route exact path="/newpoetry">
            <NewPoetry></NewPoetry>
          </Route>
          <Route exact path="/savedpoetries">
            <NewPoetry></NewPoetry>
          </Route>
        </div>
      </Router>
    )
  }
  else {
    return (
      <Router>
        <div>
          <div className="App">
            <Heading></Heading>
          </div>
          <Navbar auth={authentication} handleLogoutClick={handleLogoutClick}></Navbar>
          <Route exact path="/login">
            <Login userLoggedIn={handleAuthentication}></Login>
          </Route>
          <Route exact path="/signup">
            <SignUp></SignUp>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="${authentication.userObj.firstName}">
            <Home></Home>
          </Route>
          <Route exact path="/rhymingtool">
            <div><h1>Log in to access this and other amazing features</h1></div>
          </Route>
          <Route exact path="/newpoetry">
          <div><h1>Log in to access this and other amazing features</h1></div>
          </Route>
          <Route exact path="/savedpoetries">
          <div><h1>Log in to access this and other amazing features</h1></div>
          </Route>
          <Route exact path="/poetprofilecreation">
            <PenName></PenName>
          </Route>
        </div>
      </Router>
    )
  }
}
export default App;