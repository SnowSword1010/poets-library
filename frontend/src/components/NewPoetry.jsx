import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import LogInToContinue from "./LogInToContinue";

function NewPoetry() {
    const { poetData, setPoetData } = useContext(UserContext);
    const history = useHistory();

    function handleSubmitClick(event){
        event.preventDefault();
        /* If you want to access the event properties in an asynchronous way, 
        you should call event.persist() on the event, which will remove the 
        synthetic event from the pool and allow references to the event 
        to be retained by user code. */ // AS PER REACT DOCS
        event.persist();
        console.log(event.target.getElementsByClassName('form-group')[0].getElementsByClassName('form-control')[0].value);
        const poetry = {
            title: event.target.getElementsByClassName('form-group')[0].getElementsByClassName('form-control')[0].value,
            poem: event.target.getElementsByClassName('form-group')[0].getElementsByClassName('form-control')[1].value,
            penName: poetData.poet.penName
        }

        axios.post("http://localhost:5000/newpoetry", poetry).then(response => {
            console.log(response);
        })
        console.log(poetry);
    }

    return (
        poetData.poet ?
        <div>
            <h1>Type Your Poetry Here</h1>
            <form method = "post" action = "/newpoetry" onSubmit = {handleSubmitClick}>
                <div className="form-group">
                    <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="Title" required></input>
                    <textarea className="form-control" id="exampleFormControlTextarea1" rows="50" placeholder="content" required></textarea>
                    <button type="submit" class="btn btn-dark mb-2">Save Draft</button>
                </div>
            </form>
        </div>
        :
        <LogInToContinue></LogInToContinue>
    )
}

export default NewPoetry;