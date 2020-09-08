import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from "./context/UserContext";
import { useHistory } from "react-router-dom";
import LogInToContinue from "./LogInToContinue";

function NewPoetry() {
    const { poetData, setPoetData } = useContext(UserContext);
    const history = useHistory();

    
    return (
        poetData.poet ?
        <div>
            <h1>Type Your Poetry Here</h1>
            <form method = "post" action = "/newpoetry?posting">
                <div class="form-group">
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Title" required></input>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="50" placeholder="content" required></textarea>
                    <button type="submit" class="btn btn-dark mb-2">Save Draft</button>
                </div>
            </form>
        </div>
        :
        <LogInToContinue></LogInToContinue>
    )
}

export default NewPoetry;