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
      if (token === null) {
        localStorage.setItem("auth-token", "");
        token = "";
      }
      // tokenRes is a boolean
      const tokenRes = await Axios.post("http://localhost:5000/tokenIsValid", null, { headers: { "x-auth-token": token } });

      if (tokenRes.data) {
        const poetRes = await Axios.get("http://localhost:5000/poets",
          {
            headers: { "x-auth-token": token }
          });
        setPoetData({
          token,
          poet: poetRes.data
        })
      }
    }
    checkLoggedIn();
  }, []);


    return (
      <Router>
        {/* ANYTHING IN THE VALUE ATTRIBUTE OF UserContext.Provider could be 
        accessed by all of the components inside it 
        Here it stores the value of the state contatining the currently logged in
        user */}
        <UserContext.Provider value={{ poetData, setPoetData }}>
          <div>
            <div className="App">
              <Heading></Heading>
            </div>
            <Navbar></Navbar>
            <Route exact path="/login">
              <Login></Login>
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
export default App;