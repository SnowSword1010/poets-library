import React, { useState, useEffect } from 'react';
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
import UserContext from './components/context/UserContext';
import Axios from 'axios';

function App() {

  const [poetData, setPoetData] = useState({
    token: undefined,
    poet: undefined
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem("auth-token");
      if(token === null )
      {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      const tokenRes = await Axios.post("http://localhost:5000/tokenIsValid/", null, { headers: { "x-auth-token": token } });
      if(tokenRes.data)
      {
        const poetRes = await Axios.get("http://localhost:5000/poets/", 
        {headers: {"x-auth-token": token},
      });
      setPoetData({
        token,
        poet: poetRes.data
      })
      }
    }

    checkLoggedIn();
  }, []);

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
        {/* ANYTHING IN THE VALUE ATTRIBUTE OF UserContext.Provider could be 
        accm@j.comessed by all of the components inside it 
        Here it stores the value of the state contatining the currently logged in
        user */}
        <UserContext.Provider value={{ poetData, setPoetData }}>
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
        </UserContext.Provider>
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