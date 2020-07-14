import React, { useState } from 'react';
//import ReactDOM from 'react-dom';

function App() {

  fetch("https://wordsapiv1.p.rapidapi.com/words/bike/rhymes", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
      "x-rapidapi-key": "5592ff693emsh08d2bd989ed0290p16719bjsnda0ee71ee222"
    }
  })
    .then(response => response.json())
    .then(function(data){
      console.log(data.rhymes.all);
    })
    .catch(err => {
      console.log(err);
    });

  function Heading() {
    return (
      <header className="App-header">
        <h1>sollicitudin nibh sit amet commodo</h1>
      </header>
    )
  }

  const [technology, setTechnology] = useState("");

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
        <div><h1>This is the Frontend workspace</h1></div>
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