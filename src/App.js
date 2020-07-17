import React, { useState } from 'react';
import Word from "./components/Word";
import RhymeCard from "./components/RhymeCard";
//import ReactDOM from 'react-dom';

function App() {

  const [technology, setTechnology] = useState("");

  // listOfRhymes is an array of containing the rhyming words of the word inputted by the user. This array has been initialised to an empty array []
  // setRhymes is a function that can be used to modify the array listOfRhymes
  const [listOfRhymes, setRhymes] = useState([]);

  function Heading() {
    return (
      <header className="App-header">
        <h1>sollicitudin nibh sit amet commodo</h1>
      </header>
    )
  }

  // fetchedRhymes is the array of rhyming words of the inputted word.
  function showRhymes(fetchedRhymes) {
    // Updates the value of the array listOfRhymes to the rhyming words obtained.
    setRhymes(fetchedRhymes);
  }

  function handleClick(e) {
    setTechnology(e.target.name)
  }

  function Body() {
    if (technology === "") {
      return (
        <div><h1>This is the landing workspace</h1></div>
      )
    }
    else if (technology === "Frontend") {
      return (
        <div><h1>This is the Frontend workspace</h1>
          <Word onShowRhymes={showRhymes}></Word>
          {/* Creating a RhymeCard for each of the rhyming word */}
          {listOfRhymes.map((element) => {
            return (
              <RhymeCard name = {element}></RhymeCard>
            )
          })}
        </div>
      )
    }
  }
  return (
    <div>
      <div className="App">
        <Heading></Heading>
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">Navbar</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown
        </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#" onClick={handleClick} name="Frontend">Frontend</a>
                <a className="dropdown-item" href="#" onClick={handleClick} name="Backend">Backend</a>
                <a className="dropdown-item" href="#" onClick={handleClick} name="x">x</a>
                <a className="dropdown-item" href="#" onClick={handleClick} name="y">y</a>
                <a className="dropdown-item" href="#" onClick={handleClick} name="z">z</a>
                <div className="dropdown-divider"></div>
                <a className="dropdown-item" href="#">Something else here</a>
              </div>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
      <Body></Body>
    </div>
  )
}

export default App;