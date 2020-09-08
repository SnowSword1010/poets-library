import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";

function Navbar() {

    const { poetData, setPoetData } = useContext(UserContext);
    const history = useHistory();

    function handleLogoutClick() {
        setPoetData({
          token: undefined,
          poet: undefined,
        });
        localStorage.setItem("auth-token", "");
      }

    // The UserReg function is primarily used to render suitable Login Pages based on whether the user is logged in or not.
    function UserReg() {
        return (poetData.poet
            ?
            <form className="form-inline my-2 my-lg-0">
                <p>A poetic day to {poetData.poet.penName}!</p>
                <Link to="/" className="btn btn-outline-success my-2 my-sm-0" onClick={handleLogoutClick} name="logout">Log Out</Link>
            </form>
            :
            <form className="form-inline my-2 my-lg-0">
                <Link to="/login" className="btn btn-outline-success my-2 my-sm-0">Log In</Link>
                <Link to="/signup" className="btn btn-outline-success my-2 my-sm-0">Sign Up</Link>
            </form>

        )
    }

    return (
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
                        {/* <a className="nav-link" href="#rhymes" onClick={props.handleClick} name="rhyme">Rhyming Tool</a> */}
                        <Link to="/rhymingtool" className="nav-link" name="Rhyming Tool">Rhyming Tool</Link>
                    </li>
                    <li className="nav-item">
                        {/* <a className="nav-link" href="#" onClick={props.handleClick} name="New Poem">New Poem</a> */}
                        <Link to="/newpoetry" className="nav-link" name="New Poem">New Poem</Link>
                    </li>
                    <li className="nav-item">
                        {/* <a className="nav-link" href="#" onClick={props.handleClick} name="Saved Poetries">Saved Poetries</a> */}
                        <Link to="/mypoetries" className="nav-link" name="My Poetries">My Poetries</Link>
                    </li>
                    <li className="nav-item">
                        {/* <a className="nav-link" href="#" onClick={props.handleClick} name="quote">Gimme a Quote!</a> */}
                        <Link to="/quote" className="nav-link" name="Quote">Gimme a Quote!</Link>
                    </li>
                </ul>
                <UserReg></UserReg>
            </div>
        </nav>
    )
}

export default Navbar;