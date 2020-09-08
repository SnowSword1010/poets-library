import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import  {Link, Redirect, useHistory } from 'react-router-dom';

function SignUp() {

    // Throught the useHistory library we can link to another router without explicitly doing so with the link tag.
    let history = useHistory();
    function handleSignUpClick(event) {
        event.preventDefault();
        const formData = {
            firstName: event.target.getElementsByClassName('form-row')[0].getElementsByClassName('col')[0].getElementsByClassName('form-control')[0].value,
            lastName: event.target.getElementsByClassName('form-row')[0].getElementsByClassName('col')[1].getElementsByClassName('form-control')[0].value,
            email: event.target.getElementsByClassName('form-group')[0].getElementsByClassName('form-control')[0].value,
            password: event.target.getElementsByClassName('form-group')[1].getElementsByClassName('form-control')[0].value,
            }
        axios.post("http://localhost:5000/signup", formData).then(response => {
            console.log(response);
            history.push('poetprofilecreation');
        });
    }

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

export default SignUp;