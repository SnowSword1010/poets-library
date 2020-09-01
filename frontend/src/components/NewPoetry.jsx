import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

function NewPoetry() {
    return (
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
    )
}

export default NewPoetry;