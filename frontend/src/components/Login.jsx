import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";

function Login(props) {

    const { setPoetData } = useContext(UserContext);
    const history = useHistory();

    function handleLogInClick(event) {
        event.preventDefault();
        const formData = {
            email: event.target.getElementsByClassName('form-group')[0].getElementsByClassName('form-control')[0].value,
            password: event.target.getElementsByClassName('form-group')[1].getElementsByClassName('form-control')[0].value
        }
        axios.post("http://localhost:5000/login", formData).then(response => {
            // response is an onject which sets islogin to true and fetches the data concerned with the user in a JSON object.
            // We have to pass this response to a function
            // const email = event.target.getElementsByClassName('form-group')[0].getElementsByClassName('form-control')[0].value
            setPoetData({
                token: response.data.token,
                poet: response.data.poet
            })
            localStorage.setItem("auth-token", response.data.token);
            history.push("/");
            // console.log("User authenticated");
        });
    }

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

export default Login;