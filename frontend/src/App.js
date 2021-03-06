import React, { useState, useEffect } from 'react';
import Heading from "./components/Heading";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import RhymingTool from "./components/RhymingTool";
import LiteraryToolbox from "./components/LiteraryToolbox";
import DefinitionTool from "./components/Definition Tool";
import SynonymTool from "./components/SynonymTool";
import { render } from 'react-dom';
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import LogInToContinue from "./components/LogInToContinue";
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import ReactDOM from 'react-dom';
import NewPoetry from './components/NewPoetry';
import PenName from './components/PenName';
import UserContext from './components/context/UserContext';
import MyPoetries from "./components/MyPoetries";
import Quote from "./components/Quote";
import EditDraft from "./components/EditDraft";
import PublishMessage from "./components/PublishMessage";
import Published from "./components/Published";
import ShowPublishedPoetry from "./components/ShowPublishedPoetry";
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
            headers: { "x-auth-token": token },
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
          <Heading></Heading>
          <Navbar></Navbar>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <Route exact path="/signup">
            <SignUp></SignUp>
          </Route>
          <Route exact path="/poetprofilecreation">
            <PenName></PenName>
          </Route>
          <Route exact path="/literarytoolbox">
            <LiteraryToolbox></LiteraryToolbox>
          </Route>
          <Route exact path="/rhymingtool">
            <RhymingTool></RhymingTool>
          </Route>
          <Route exact path="/definitiontool">
            <DefinitionTool></DefinitionTool>
          </Route>
          <Route exact path="/synonymtool">
            <SynonymTool></SynonymTool>
          </Route>
          <Route exact path="/newpoetry">
            <NewPoetry></NewPoetry>
          </Route>
          <Route exact path="/mypoetries">
            <MyPoetries></MyPoetries>
          </Route>
          <Route exact path="/quote">
            <Quote pData={poetData}></Quote>
          </Route>
          <Route exact path="/edit/:id">
            <EditDraft></EditDraft>
          </Route>
          <Route exact path="/publish/:id">
            <PublishMessage></PublishMessage>
          </Route>
          <Route exact path="/published">
            <Published></Published>
          </Route>
          <Route exact path="/show/:id">
            <ShowPublishedPoetry></ShowPublishedPoetry>
          </Route>
        </div>
      </UserContext.Provider>
    </Router>
  )
}
export default App;