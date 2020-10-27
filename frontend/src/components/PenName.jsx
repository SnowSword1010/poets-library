import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./context/UserContext";
import BorderColorIcon from '@material-ui/icons/BorderColor';
import { useHistory } from "react-router-dom";

function PenName(){
    // Throught the useHistory library we can link to another router without explicitly doing so with the link tag.
    let history = useHistory();
    function handleSubmitClick(event)
    {
        event.preventDefault();
        const formData = {
            penName: event.target.getElementsByClassName('form-control')[0].value
        }
        axios.post("http://localhost:5000/poetprofilecreation", formData).then(response => {
            // To know more about axios, head over to the Login component
            console.log("Poet authenticated");
            history.push("/");
        });
    }

    return(
        <form method="post" action="/poetprofilecreation" onSubmit={handleSubmitClick}>
            <input type = "text" placeholder = "Enter your penname" name="penName" className = "form-control penName"></input>
            <button type = "submit" className="penNameButton"><BorderColorIcon></BorderColorIcon></button>
        </form>
    )
}

export default PenName;