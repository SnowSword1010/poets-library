import React, { useState } from 'react';
import Word from "./components/Word";
import RhymeCard from "./components/RhymeCard";
import { render } from 'react-dom';
import axios from "axios";
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
    e.preventDefault();
  }

  function Body() {

    function handleSignUpClick(event) {
      event.preventDefault();
      const formData = {
        firstName: event.target.getElementsByClassName('form-row')[0].getElementsByClassName('col')[0].getElementsByClassName('form-control')[0].value,
        lastName: event.target.getElementsByClassName('form-row')[0].getElementsByClassName('col')[1].getElementsByClassName('form-control')[0].value,
        email: event.target.getElementsByClassName('form-group')[0].getElementsByClassName('form-control')[0].value,
        password: event.target.getElementsByClassName('form-group')[1].getElementsByClassName('form-control')[0].value,
        data: {}
      }
      axios.post("http://localhost:5000/signup", formData).then(response => {
        console.log("User created");
      });
    }

    function handleLogInClick(event) {
      event.preventDefault();
      const formData = {
        email: event.target.getElementsByClassName('form-group')[0].getElementsByClassName('form-control')[0].value,
        password: event.target.getElementsByClassName('form-group')[1].getElementsByClassName('form-control')[0].value
      }
      axios.post("http://localhost:5000/login", formData).then(response => {
        console.log("User authenticated");
      });
    }
    if (technology === "") {
      return (
        <div><h1>This is the landing workspace</h1></div>
      )
    }
    else if (technology === "rhyme") {
      return (
        <div>
          <Word onShowRhymes={showRhymes}></Word>
          {/* Creating a RhymeCard for each of the rhyming word */
            //renderWords(listOfRhymes)
          }
          <div className="row">
            {listOfRhymes.map((element) => <div className="col-lg-2"><RhymeCard name={element}></RhymeCard></div>)}
          </div>
        </div>
      )
    }
    else if (technology === "login") {
      return (
        <div>
          <form method="post" action="/login" onSubmit={handleLogInClick}>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" class="btn btn-dark">Log In</button>
          </form>
        </div>
      )
    }
    else if (technology === "signup") {
      return (
        <div>
          <form method="post" action="/signup" onSubmit={handleSignUpClick}>
            <div class="form-row">
              <div class="col">
                <label for="validationCustom01">First name</label>
                <input className="inputWord" name="firstName" type="text" class="form-control" placeholder="First name" />
              </div>
              <div class="col">
                <label for="validationCustom01">Last name</label>
                <input className="inputWord" name="lastName" type="text" class="form-control" placeholder="Last name" />
              </div>
            </div>
            <div className="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input className="inputWord" name="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></input>
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input className="inputWord" name="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" class="btn btn-dark">Sign Up</button>
          </form>
        </div>
      )
    }
  }
  {/* <li className="nav-item dropdown">
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
          */}
  return (
    <div>
      <div className="App">
        <Heading></Heading>
      </div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Logo</a>
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
            <li className="nav-item">
              <a className="nav-link" href="#rhymes" onClick={handleClick} name="rhyme">Rhyming Tool</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleClick} name="New Poem">New Poem</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleClick} name="Saved Poetries">Saved Poetries</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={handleClick} name="quote">Gimme a Quote!</a>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" href="/login" onClick={handleClick} name="login">Log In</button>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit" href="/login" onClick={handleClick} name="signup">Sign Up </button>
          </form>
        </div>
      </nav>
      <Body></Body>
    </div>
  )
}

export default App;