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
                <h4 className="navbar-greeting">A poetic day to {poetData.poet.penName}!</h4>
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
        <nav className="navbar navbar-expand-lg navbar-dark custom-nav-style">
            <a className="navbar-brand" href="/"><div className="svg-imgs-div">
                <svg class="icon svg-imgs">
                    <use xlinkHref="icons/Mycollection-SVG-sprite.svg#feather" />
                </svg>
            </div></a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/rhymingtool" className="nav-link" name="Rhyming Tool"><div className="nav-text-beside-svg">Rhyming Tool</div>
                            <div className="svg-imgs-div">
                                <svg class="icon svg-imgs">
                                    <use xlinkHref="icons/Mycollection-SVG-sprite.svg#literature" />
                                </svg>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/newpoetry" className="nav-link" name="New Poem"><div className="nav-text-beside-svg">New Poem</div>
                            <div className="svg-imgs-div">
                                <svg class="icon svg-imgs">
                                    <use xlinkHref="icons/Mycollection-SVG-sprite.svg#parchment" />
                                </svg>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/mypoetries" className="nav-link" name="My Poetries"><div className="nav-text-beside-svg">My Poetries</div>
                            <div className="svg-imgs-div">
                                <svg class="icon svg-imgs">
                                    <use xlinkHref="icons/Mycollection-SVG-sprite.svg#scroll" />
                                </svg>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/quote" className="nav-link" name="Quote"><div className="nav-text-beside-svg">Gimme a Quote!</div>
                            <div className="svg-imgs-div">
                                <svg class="icon svg-imgs">
                                    <use xlinkHref="icons/Mycollection-SVG-sprite.svg#poem" />
                                </svg>
                            </div>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/published" className="nav-link" name="Published"><div className="nav-text-beside-svg">Published</div>
                            <div className="svg-imgs-div">
                                <svg class="icon svg-imgs">
                                    <use xlinkHref="icons/Mycollection-SVG-sprite.svg#ballad" />
                                </svg>
                            </div>
                        </Link>
                    </li>
                </ul>
                <UserReg></UserReg>
            </div>
        </nav>
    )
}

export default Navbar;