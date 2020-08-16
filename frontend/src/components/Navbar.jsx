import React from 'react';
import ReactDOM from 'react-dom';

function Navbar(props) {

    // The UserReg function is primarily used to render suitable Login Pages based on whether the user is logged in or not.
    function UserReg() {
        console.log(props.auth);
        // props.auth gives access to authentication variable in the App.js file. It becomes easier to work with the user's attributes from there.
        if (props.auth.isLoggedIn === false) {
            return (
                <form className="form-inline my-2 my-lg-0">
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" href="/login" onClick={props.handleClick} name="login">Log In</button>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" href="/login" onClick={props.handleClick} name="signup">Sign Up </button>
                </form>
            )
        }
        else {
            return (
                <form className="form-inline my-2 my-lg-0">
                    <p>A poetic day to {props.auth.userObj.firstName}!</p>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit" href="/" onClick={props.handleLogOutClick} name="logout">Log Out</button>
                </form>
            )
        }
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
                        <a className="nav-link" href="#rhymes" onClick={props.handleClick} name="rhyme">Rhyming Tool</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={props.handleClick} name="New Poem">New Poem</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={props.handleClick} name="Saved Poetries">Saved Poetries</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={props.handleClick} name="quote">Gimme a Quote!</a>
                    </li>
                </ul>
            <UserReg></UserReg>
            </div>
        </nav>
    )
}

export default Navbar;