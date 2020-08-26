import React from 'react';
import axios from "axios";

function PenName(){

    function handleSubmitClick(event)
    {
        event.preventDefault();
        const formData = {
            penName: event.target.getElementsByClassName('form-control')[0].value
        }
        axios.post("http://localhost:5000/poetprofilecreation", formData).then(response => {
            // To know more about axios, head over to the Login component
            console.log("Poet authenticated");
        });
    }

    return(
        <form method="post" action="/poetprofilecreation" onSubmit={handleSubmitClick}>
            <input type = "text" placeholder = "Enter your penname" name="penName" className = "form-control"></input>
            <button type = "submit">Submit</button>
        </form>
    )
}

export default PenName;